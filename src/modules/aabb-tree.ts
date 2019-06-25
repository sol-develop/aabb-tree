import Aabb from "./aabb.js";
import TreeNode from "./tree-node.js";

class AabbTree {
  private root: TreeNode;

  constructor() {
    // nothing to do here
  }

  public getRoot(): TreeNode {
    return this.root;
  }

  public addElement(element: any, aabb: Aabb): AabbTree {
    const newNode: TreeNode = new TreeNode(element, aabb);
    const newAabb: Aabb = new Aabb();
    let currentNode: TreeNode;

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    currentNode = this.root;
    newAabb.embrace(currentNode.getAabb(), aabb);

    while (!currentNode.isLeaf()) {
      const leftChild: TreeNode = currentNode.getLeftChild();
      const rightChild: TreeNode = currentNode.getRightChild();
      const leftAabb: Aabb = new Aabb();
      const rightAabb: Aabb = new Aabb();

      leftAabb.embrace(leftChild.getAabb(), aabb);
      rightAabb.embrace(rightChild.getAabb(), aabb);

      currentNode.setAabb(newAabb.getCopy());
      if (leftAabb.getAcreage() <= rightAabb.getAcreage()) {
        newAabb.embrace(leftChild.getAabb(), leftAabb);
        currentNode = leftChild;
      } else {
        newAabb.embrace(rightChild.getAabb(), rightAabb);
        currentNode = rightChild;
      }
    }

    currentNode.setLeftChild(newNode);
    currentNode.setRightChild(currentNode.getCopy());
    currentNode.setAabb(newAabb.getCopy());
    currentNode.setElement(null);

    return this;
  }

  public removeElement(element: any): any {
    // pass
  }

  /**
   * Get all elements that collides with given point.
   * @param x x coordinate of point
   * @param y y coordinate of point
   *
   * @returns array of colliding elements
   */
  public getElementsByPointCollision(x: number, y: number): any[] {
    const stack: TreeNode[] = [];
    const collidingElements: any[] = [];
    let currentNode: TreeNode;

    if (!this.root) {
      return collidingElements;
    }

    stack.push(this.root);

    while (stack.length > 0) {
      currentNode = stack.pop();
      if (currentNode.getAabb().collidesWithPoint(x, y)) {
        if (currentNode.isLeaf()) {
          collidingElements.push(currentNode.getElement());
        } else {
          stack.push(currentNode.getLeftChild());
          stack.push(currentNode.getRightChild());
        }
      }
    }

    return collidingElements;
  }

  /**
   * Get all elements that collides with given aabb.
   * @param aabb the aabb to test the collision with
   *
   * @returns array of colliding elements
   */
  public getElementsByAabbCollision(aabb: Aabb): any[] {
    const stack: TreeNode[] = [];
    const collidingElements: any[] = [];
    let currentNode: TreeNode;

    if (!this.root) {
      return collidingElements;
    }

    stack.push(this.root);

    while (stack.length > 0) {
      currentNode = stack.pop();
      if (currentNode.getAabb().collidesWithAabb(aabb)) {
        if (currentNode.isLeaf()) {
          collidingElements.push(currentNode.getElement());
        } else {
          stack.push(currentNode.getLeftChild());
          stack.push(currentNode.getRightChild());
        }
      }
    }

    return collidingElements;
  }
}

export default AabbTree;
