# RVCheckbox

基于 react-virtualized 的 大数据量下的多选 checkbox 组件

## Development

```
npm install
npm start
```

## install

[![rv-checkbox](https://nodei.co/npm/rv-checkbox.png)](https://npmjs.org/package/rv-checkbox)

## Usage

```jsx
import RVCheckbox from 'rv-checkbox'
<RVCheckbox options={[{label:'', value:''} ... ]} />
```

## API

### props

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
