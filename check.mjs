import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
const root = path.dirname(fileURLToPath(import.meta.url));
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const html = read('index.html');
new vm.Script(read('app.js'),{filename:'app.js'});
const context = {window:{}};vm.createContext(context);vm.runInContext(read('content.js'),context);
const data = context.window.PORTFOLIO;
assert.ok(data.projects.length>0);assert.ok(data.stamps.length>0);
const ids = data.projects.map(p=>p.id);
assert.equal(new Set(ids).size,ids.length,'项目 ID 重复');
const files = new Set([...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(m=>m[1]).filter(v=>!v.includes(':')).map(v=>v.split(/[?#]/)[0]));
for(const p of data.projects){
  assert.ok(p.sections.length>=3,`${p.id} 缺少项目过程`);
  assert.ok(p.metrics.length===3,`${p.id} 缺少指标`);
  assert.ok(['ai','growth'].includes(p.category));
  files.add(p.cover);p.gallery?.forEach(v=>files.add(v));
}
data.photos.forEach(p=>files.add(p.image));
for(const stamp of data.stamps) for(const item of stamp.items) if(item.project) assert.ok(ids.includes(item.project),`经历指向不存在的项目：${item.project}`);
for(const file of files) assert.ok(fs.existsSync(path.join(root,file)),`缺少文件：${file}`);
for(const anchor of [...html.matchAll(/href="#([^"]+)"/g)].map(m=>m[1])) assert.ok(html.includes(`id="${anchor}"`),`缺少锚点：${anchor}`);
assert.ok(html.includes('aria-labelledby="dialog-title"'));
assert.ok(read('styles.css').includes('prefers-reduced-motion'));
console.log(`检查通过：${data.projects.length} 个项目、${data.stamps.length} 张经历卡、${data.photos.length} 张照片、${files.size} 个素材与链接。`);
