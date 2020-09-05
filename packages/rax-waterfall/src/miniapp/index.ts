'use strict';
import fmtEvent from './fmtEvent';

Component({
  data: {
    columns: []
  },
  // @ts-ignore
  props: {
    onEndReached: () => { },
    endReachedThreshold: 500,
    columnWidth: '750rpx',
    columnCount: 1,
    dataSource: [],
    leftGap: 0,
    rightGap: 0
  },
  deriveDataFromProps(nextProps) {
    this.update(nextProps);
  },
  didMount: function didMount() {
    if (!my.canIUse('component2')) {
      this.update(this.props);
    }
  },
  didUpdate: function didUpdate() {
    if (!my.canIUse('component2')) {
      this.update(this.props);
    }
  },
  methods: {
    onEndReached(e) {
      if (typeof this.props.onEndReached == 'function') {
        var event = fmtEvent(this.props, e);
        this.props.onEndReached(event);
      }
    },
    update({ dataSource, columnCount }) {
      let columns = this.getColunms(dataSource, columnCount);
      this.setData({ columns });
    },
    getColunms(dataSource = [], columnCount = 1) {
      let columns = [];
      let moduleHeights = [];

      for (let i = 0; i < columnCount; i++) {
        columns[i] = [];
        moduleHeights[i] = 0;
      }

      dataSource && dataSource.forEach((item, i) => {
        let targetColumnIndex = 0;
        let minHeight = moduleHeights[0];

        for (let j = 0; j < columnCount; j++) {
          if (moduleHeights[j] < minHeight) {
            minHeight = moduleHeights[j];
            targetColumnIndex = j;
          }
        }

        moduleHeights[targetColumnIndex] += item.height;
        columns[targetColumnIndex].push(item);
      });
      return columns;
    }
  }
});
