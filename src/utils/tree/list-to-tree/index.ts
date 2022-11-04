import { Node } from "./types";
/**
 * Преобразование списка в иерархию
 * @param list {Array} Список объектов с отношеним на родителя
 * @param key {String} Свойство с первичным ключём
 * @returns {Array} Корневые узлы
 */
export default function listToTree(
  list: Array<Node>,
  key: string = "_id"
): Array<any> {
  let trees: any = {};
  let roots: any = {};
  for (const item of list) {
    console.log(item);
    const kval = item[key];
    // Добавление элемента в индекс узлов с создание свойства children
    if (!trees[kval]) {
      trees[kval] = item;
      trees[kval].children = [];
      // Ещё никто не ссылался, поэтому пока считаем корнем
      roots[kval] = trees[kval];
    } else {
      trees[kval] = Object.assign(trees[kval], item);
    }

    // Если элемент имеет родителя, то добавляем его в подчиенные родителя
    if (item.parent?._id) {
      // Если родителя ещё нет в индексе, то индек созадётся, ведь _id родителя известен
      if (!trees[item.parent._id]) trees[item.parent._id] = { children: [] };
      // Добавления в подчиенные родителя
      trees[item.parent._id].children.push(trees[kval]);
      // Так как элемент добавлен к родителю, то он уже не является корневым
      if (roots[kval]) delete roots[kval];
    }
  }
  return Object.values(roots);
}
