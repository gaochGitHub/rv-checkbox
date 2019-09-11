import React, { Component } from "react"
import { List } from "react-virtualized"
import PropTypes from "prop-types"
import { AutoSizer } from "react-virtualized"
import classnames from "classnames"
import Checkbox from "rc-checkbox"
import "./style.css"

class Checkboxes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value || []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.list.forceUpdateGrid()
    if ("value" in nextProps) {
      const { value } = nextProps
      this.setState({ value })
    }
  }

  handleChange = record => {
    const optionIndex = this.state.value.indexOf(record.value)
    const value = [...this.state.value]
    if (optionIndex === -1) {
      value.push(record.value)
    } else {
      value.splice(optionIndex, 1)
    }
    if (!("value" in this.props)) {
      this.setState({ value })
    }
    const onChange = this.props.onChange
    if (onChange) {
      onChange(value)
    }
  }

  checkboxRenderer = ({ index, style }) => {
    const { options, disabled, prefixCls = "prefixCls" } = this.props
    const item = options[index]
    return (
      <label key={item.value.toString()} style={{ ...style, margin: 0 }}>
        <Checkbox
          prefixCls={prefixCls}
          key={item.value.toString()}
          disabled={disabled}
          value={item.value}
          checked={this.state.value.indexOf(item.value) !== -1}
          onChange={() => this.handleChange(item)}
          className={`${"groupPrefixCls"}-item`}
        />
        {item.label}
      </label>
    )
  }

  render() {
    const { options, rowHeight, height, width } = this.props
    const rowCount = options.length
    return (
      <List
        style={{ outline: "none" }}
        height={height}
        width={width}
        ref={ref => {
          this.list = ref
        }}
        rowCount={rowCount}
        rowHeight={rowHeight}
        rowRenderer={this.checkboxRenderer}
      />
    )
  }
}

const HeaderBar = ({
  title,
  filter,
  checkAll,
  onChange,
  onCheckAll,
  height,
  width,
  disabled,
  headerWrapperClassName
}) => (
  <div
    style={{ width, height }}
    className={classnames("vcheader__wrapper", headerWrapperClassName)}
  >
    <div>
      <label>
        <Checkbox
          prefixCls={"prefixCls"}
          className="vchcheckbox__wrapper"
          checked={checkAll}
          onChange={e => onCheckAll(e.target.checked)}
          disabled={disabled}
        />
        {` 全选 ${title}`}
      </label>
    </div>
    {filter && (
      <div className="vcheader__search">
        <input
          // className="vc__input"
          placeholder="filter"
          onChange={e => onChange(e.target.value)}
          // size="small"
        />
      </div>
    )}
  </div>
)

class VirtualizedCheckbox extends Component {
  static propTypes = {
    // 失效状态  boolean default: false
    disabled: PropTypes.bool,
    // 搜索框&标题头的高度  number|string default: 34
    headerHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    // 宽高不传入的话，需给定外部容器的宽高
    //高度  number|string default: 400
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //宽度  number|string default: 400
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //指定选中的选项	string[]|number[] default: []
    value: PropTypes.array,
    //默认选中的选项	string[]|number[] default: []
    defaultValue: PropTypes.array,
    //指定可选项	string[] | object[] defalut： []
    options: PropTypes.array,
    //变化时回调函数	Function(checkedValue) defalut: -
    onChange: PropTypes.func,
    //是否过滤 boolean| Function() default: false
    filter: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
  }

  static defaultProps = {
    disabled: false,
    headerHeight: 34,
    onChange: () => null,
    rowHeight: 30,
    filter: false
  }

  constructor(props) {
    super(props)
    const { value, defaultValue } = props
    let result = this.optimizeOptions()
    this.state = {
      value: value || defaultValue || [],
      options: result,
      filterText: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      const { value } = nextProps
      this.setState({ value })
    }
  }

  optimizeOptions() {
    const { options } = this.props
    return options.map(option => {
      if (typeof option === "string") {
        return {
          label: option,
          value: option
        }
      }
      return option
    })
  }

  getFilteredItems = () => {
    const { options, filter } = this.props
    const { filterText } = this.state
    if (!filterText || !filter) {
      return options
    } else {
      if (typeof filter === "boolean") {
        let results = options.filter(
          it =>
            it.label &&
            it.label.toLowerCase().indexOf(filterText.toLowerCase()) >= 0
        )
        return results
      } else if (typeof filter === "function") {
        return options.filter(it => filter(filterText, it.label))
      }
    }
  }

  handleCheckAllChange = checked => {
    const { onChange } = this.props
    const items = checked ? this.getFilteredItems().map(it => it.value) : []
    this.setState({
      checkAll: checked,
      value: items
    })
    if (typeof onChange === "function") onChange(items)
  }

  handleChange = value => {
    const { onChange } = this.props
    if (typeof onChange === "function") onChange(value)
    this.setState({ value })
  }

  handleFilterChange = value => {
    this.setState(() => ({
      filterText: value
    }))
  }
  getRect(h, w) {
    let _height = h || 400
    let _width = w || 400
    return { height: _height + 16, width: _width + 16 }
  }
  render() {
    const {
      title,
      height: propHeight,
      width: propWidth,
      rowHeight,
      headerHeight,
      disabled,
      filter,
      headerWrapperClassName,
      wrapperClassName
    } = this.props
    const { filterText, value } = this.state
    const showHeader = filter || title
    const virtualScrollHeight = h => {
      let i = 0
      if (showHeader) {
        i += 1
      }
      const actualHeight = h || 400
      return actualHeight - i * headerHeight
    }
    const filterOptions = this.getFilteredItems()
    const _terminalWidth = w => w || 400
    return (
      <AutoSizer>
        {({ width, height }) => (
          <div
            style={this.getRect(propHeight || height, propWidth || width)}
            className={classnames("virtualized-checkbox", wrapperClassName)}
          >
            {showHeader && (
              <HeaderBar
                headerWrapperClassName={headerWrapperClassName}
                height={headerHeight}
                width={propWidth || width}
                disabled={disabled}
                title={filterText ? "过滤结果" : title}
                checkAll={
                  filterOptions.length && value.length === filterOptions.length
                }
                filter={filter}
                onCheckAll={this.handleCheckAllChange}
                onChange={this.handleFilterChange}
              />
            )}
            {/* <CheckboxGroup disabled={disabled} value={this.state.value} onChange={this.handleChange}> */}
            <Checkboxes
              height={virtualScrollHeight(propHeight || height)}
              width={_terminalWidth(propWidth || width)}
              options={filterOptions}
              rowHeight={rowHeight}
              value={value}
              onChange={this.handleChange}
            />
            {/* </CheckboxGroup> */}
          </div>
        )}
      </AutoSizer>
    )
  }
}

export default VirtualizedCheckbox
