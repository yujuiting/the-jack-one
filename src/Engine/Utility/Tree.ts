import { addToArray,
         removeFromArray } from 'Engine/Utility/ArrayUtility';

export class ReadonlyTree<T> {

  protected _parent: Tree<T>|null = null;

  public get parent(): Tree<T>|null { return this._parent; }

  public get isRoot(): boolean { return !this._parent; }

  public get isLeaf(): boolean { return this._children.length === 0; }

  public get length(): number { return this._children.length; }

  public get children(): ReadonlyArray<Tree<T>> { return this._children; }

  constructor(public data: T,
              protected _children: Tree<T>[] = []) {}

  public has(child: Tree<T>): boolean {
    return this._children.indexOf(child) !== -1;
  }

  public forEachChildren(callback: (data: T) => void): void {
    /**
     * depth first search
     * TODO: optimization
     */
    const stack: ReadonlyTree<T>[] = this._children.slice();
    let current: ReadonlyTree<T>|undefined = stack.pop();
    while (current) {
      for (let i = current.children.length - 1; i > -1; i--) {
        stack.push(current.children[i]);
      }
      callback(current.data);
      current = stack.pop();
    }
  }

  public findParent(condition: (data: T) => boolean): T|null {
    let parent = this.parent;
    while (parent) {
      if (condition(parent.data)) {
        return parent.data;
      } else {
        parent = parent.parent;
      }
    }

    return null;
  }

}

// export class Tree<T> implements Iterable<Tree<T>|null> {
export class Tree<T> extends ReadonlyTree<T> {

  public add(child: Tree<T>): boolean {
    child._parent = this;

    return addToArray(this._children, child);
  }

  public remove(child: Tree<T>): boolean {
    child._parent = null;

    return removeFromArray(this._children, child);
  }

  /**
   * Hide this from parent
   */
  public hide(): boolean {
    if (!this.parent) {
      return false;
    }

    return removeFromArray(this.parent._children, this);
  }

  /**
   * Show this from parent
   */
  public show(): boolean {
    if (!this.parent) {
      return false;
    }

    return addToArray(this.parent._children, this);
  }

}

// class TreeIterator implements Iterator<Tree<any>|null> {
//   private pointer: number = 0;
//   constructor(private source: Tree<any>) {}
//   public next(): IteratorResult<Tree<any>|null> {
//     if (this.pointer < this.source.length) {
//       return {
//         done: false,
//         value: (<any>this.source).children[this.pointer]
//       };
//     } else {
//       return { done: true, value: null };
//     }
//   }
// }
