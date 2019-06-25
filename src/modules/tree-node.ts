import Aabb from "./aabb.js";

class TreeNode {
  private parent: TreeNode;
  private childLeft: TreeNode;
  private childRight: TreeNode;
  private aabb: Aabb;
  private element: any;

  constructor(element: any, aabb: Aabb) {
    this.element = element;
    this.aabb = aabb;
  }

  public isRoot(): boolean {
    return (this.parent === null);
  }

  public isLeaf(): boolean {
    return !this.childLeft;
  }

  public getCopy(): TreeNode {
    return new TreeNode(this.element, this.aabb);
  }

  public getParent(): TreeNode {
    return this.parent;
  }

  public setParent(node: TreeNode): TreeNode {
    this.parent = node;

    return this;
  }

  public getLeftChild(): TreeNode {
    return this.childLeft;
  }

  public getRightChild(): TreeNode {
    return this.childRight;
  }

  public setLeftChild(node: TreeNode): TreeNode {
    this.childLeft = node;
    node.setParent(this);

    return this;
  }

  public setRightChild(node: TreeNode): TreeNode {
    this.childRight = node;
    node.setParent(this);

    return this;
  }

  public getAabb(): Aabb {
    return this.aabb;
  }

  public setAabb(aabb: Aabb): TreeNode {
    this.aabb = aabb;

    return this;
  }

  public setElement(element: any): TreeNode {
    this.element = element;

    return this;
  }

  public getElement(): any {
    return this.element;
  }
}

export default TreeNode;
