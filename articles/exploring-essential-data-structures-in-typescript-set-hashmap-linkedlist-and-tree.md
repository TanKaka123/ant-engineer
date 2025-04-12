---
title: "Set, HashMap, LinkedList & Tree in TypeScript 🔢"
date: "2025-03-10"
readingTime: 8
coverImage: "/gara.png"
excerpt: "Dive into essential data structures in TypeScript, including Set, HashMap, LinkedList, and Tree. Learn their definitions, use cases, advantages, disadvantages, and see example code."
tags: ["javascript", "typescript", "data-structures"]
---

Data structures are fundamental components in software development, and TypeScript offers both built-in and custom implementations that can help you build efficient, scalable applications. In this blog, we’ll dive into four essential data structures: **Set, HashMap, LinkedList, and Tree**. For each, we cover their definition, common use cases, pros and cons, and provide example code in TypeScript.

`Figure: An overview diagram of data structures.`

## 1. Set
A **Set** is a collection of unique values. In TypeScript (and JavaScript), the built-in `Set` object automatically ensures that no duplicate values exist in the collection.

**Use Cases:**
- `Uniqueness Enforcement`: Storing unique identifiers, filtering duplicates.
- `Membership Checking`: Fast determination of whether an element exists in the collection.
- `Mathematical Operations`: Operations like union, intersection, and difference on sets of data.

**Pros**
- `Uniqueness`: Automatically prevents duplicate entries.
- `Built-in API`: Easy-to-use methods (`add`, `delete`, `has`, etc.) available.
- `Performance`: Fast insertion and lookup with average O(1) complexity.

**Cons**
- `No Indexing`: Cannot access elements by index (unlike arrays).
- `Limited Methods`: Lacks advanced manipulation methods beyond basic add, delete, and check operations.

**Example Code:**

```ts
const uniqueNumbers = new Set<number>();

// Adding values
uniqueNumbers.add(1);
uniqueNumbers.add(2);
uniqueNumbers.add(3);
uniqueNumbers.add(2); // Duplicate, ignored

// Checking membership
console.log(uniqueNumbers.has(2)); // true

// Iterating over the Set
uniqueNumbers.forEach(value => console.log(value));
// OUTPUT:  1   2  3
```

## 2. HashMap
A **HashMap** (or simply `Map` in TypeScript) is a key-value pair collection where keys are hashed for efficient retrieval.

![How to hashmap work?](hash-function.png)

**Use Cases:**
- `Data Lookup`: Fast retrieval of values by unique keys.
- `Caching`: Store and retrieve frequently accessed data.
- `Associations`: Mapping complex relationships between keys and values.

**Pros**
- `Efficiency`: O(1) average time complexity for insert, delete, and access.
- `Key Flexibility`: Supports complex key types (objects, strings, numbers).
- `Order Preservation`: Maintains insertion order.

**Cons**
- `Memory Usage`: Slightly more memory overhead than plain objects.
- `Complexity`: Requires manual handling of key-value relationships.

**Example Code:**

```ts
const userAgeMap = new Map<string, number>();

// Adding key-value pairs
userAgeMap.set("Alice", 30);
userAgeMap.set("Bob", 25);

// Accessing values
console.log(userAgeMap.get("Bob"));
// OUTPUT: 25

// Iterating over the Map
userAgeMap.forEach((age, name) => {
  console.log(`${name} is ${age} years old`);
});
// OUTPUT: 
// Alice is 30 years old
// Bob is 25 years old
```

## 3. LinkedList
A **LinkedList** is a sequential collection where each element (node) points to the next node.

![How to linkedlist work?](linklist.png)

**Use Cases:**
- `Dynamic Collections`: Efficient for lists with frequent insertions and deletions.
- `Stack/Queue Implementations`: Basis for stack and queue operations.
- `Memory Management`: Useful when continuous memory allocation (like arrays) is impractical.

**Pros**
- `Dynamic Size`: No fixed capacity; grows as needed.
- `Efficient Insert/Remove`: Fast at head/tail insertion and deletion.

**Cons**
- `Sequential Access`: O(n) time complexity for element access.
- `Memory Overhead`: Additional memory for pointers to next nodes.

**Example Code:**

```ts
class ListNode<T> {
  constructor(public value: T, public next: ListNode<T> | null = null) {}
}

class LinkedList<T> {
  private head: ListNode<T> | null = null;

  append(value: T): void {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  print(): void {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

const list = new LinkedList<number>();
list.append(10);
list.append(20);
list.print();
// OUTPUT: 10 20
```

## 4. Tree
A **Tree** is a hierarchical structure consisting of nodes, with each node having child nodes.

![How to tree work?](tree.png)


**Use Cases:**
- `Hierarchical Data`: Representing nested structures (e.g., DOM trees).
- `Search Algorithms`: Binary Search Trees (BST) enable efficient lookups.
- `Decision Processes`: Parse trees, decision trees in AI applications.

**Pros**
- `Efficiency`: Balanced trees offer O(log n) search, insert, and delete.
- `Hierarchical Representation`: Suitable for nested data modeling.

**Cons**
- `Complex Implementation`: Requires additional algorithms for balancing.
- `Memory Usage`: Each node needs storage for multiple references.

**Example Code:**

```ts
class TreeNode<T> {
  public children: TreeNode<T>[] = [];
  constructor(public value: T) {}

  addChild(child: TreeNode<T>): void {
    this.children.push(child);
  }
}

class Tree<T> {
  constructor(public root: TreeNode<T>) {}

  traverse(node: TreeNode<T> = this.root): void {
    console.log(node.value);
    node.children.forEach(child => this.traverse(child));
  }
}

const root = new TreeNode("root");
const child1 = new TreeNode("child1");
const child2 = new TreeNode("child2");
root.addChild(child1);
root.addChild(child2);

const tree = new Tree(root);
tree.traverse();
// OUTPUT: 
// root
// child1
// child2
```

## Conclusion
Understanding these core data structures helps you select the most appropriate tool for your problem. TypeScript provides excellent support for these data structures, enabling you to write clean and efficient code. Experiment with these examples and integrate them into your next project!

