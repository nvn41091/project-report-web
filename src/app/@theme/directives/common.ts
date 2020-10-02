import {TreeviewItem} from 'ngx-treeview';

export function formatTree(data, parentId, key) {
  const arr: TreeviewItem[] = [];
  let position = 1;
  for (let i = 0; i < data.length; i++) {
    const dataItem = {
      text: (data[i])[key],
      value: data[i],
      parentId: data[i].parentId,
      children: [],
      checked: false,
    };
    // tslint:disable-next-line
    if ( (!parentId || parentId.substring(0, 1) !== '#') && dataItem.parentId == parentId) {
      const children = formatTree(data, dataItem.value.id, key);
      if (children.length > 0) {
        dataItem.children = children;
      } else {
        dataItem.children = null;
      }
      dataItem.value.idx = position++;
      dataItem.value.isBottom = dataItem.value.idx === data.filter(d => d.parentId === parentId).length;
      if (data[i - 1] && data[i - 1].isDefault) {
        dataItem.value.isAfterDefault = true;
      } else  dataItem.value.isAfterDefault = false;
      const dataTreeview: TreeviewItem = new TreeviewItem({
        text: dataItem.text,
        value: dataItem.value,
        children: dataItem.children,
        checked: dataItem.checked,
        collapsed: false,
      });
      arr.push(dataTreeview);
    }
  }
  return arr;
}
