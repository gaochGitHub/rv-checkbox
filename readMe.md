# RVCheckbox

基于 react-virtualized 的 大数据量下的多选 checkboxcheckbox 组件

## `npm start` 启动 demo

## `npm run build` 打包 demo 为静态文件 (没什么用)

## `npm run dist` 打包输出目标文件 `dist/bundle.js`

## 组件的使用

```jsx
import RVCheckbox from 'rv-checkbox'
<RVCheckbox options={[{label:'', value:''} ... ]} />
```

| props        | 说明           | 参数类型                                   | 默认值 |
| ------------ | -------------- | ------------------------------------------ | ------ |
| disabled     | 失效状态       | boolean                                    | false  |
| value        | 指定选中的选项 | string[] &#124; number[]                   | []     |
| defaultValue | 默认选中的选项 | string[] &#124; number[]                   | []     |
| options      | 指定可选项     | string[]                                   | []     |
| onChange     | 变化时回调函数 | Function(checkedValue)                     | -      |
| filter       | 是否过滤       | boolean &#124; Function(filterText, label) | false  |
| height       | 高度           | string &#124; number                       | -      |
| width        | 宽度           | string &#124; number                       | -      |
