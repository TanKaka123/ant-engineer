---
title: "Stack, Queue, Microtasks, Macrotasks & the Event Loop 👷🏽‍♂️"
date: "2024-12-01"
readingTime: 10
coverImage: "/rock_lee.png"
excerpt: "An in-depth exploration of JavaScript's stack, queue, microtasks, macrotasks, and the event loop, explaining how they interact to handle asynchronous execution."
tags: [ "javascript"]
---
Javascript is often referred to as a single-threadred, which mean that it handles tasks asynchronously while running in a single thread. To achieve this, it relies on a robust system of **stack**, **queue**, **micro tasks**, **macro task** and **the event loop**. In this blog, we'll break down these concepts and explain how they work together to power javascript's execution model.

## 1. Call Stack: Where Execution Happens
The **call stack** (or **Stack**) is a fundamental part of javascript's runtime. Whenever you call a function, it gets added to the stack and when the function complete, it is popped off the stack. It operates on the principles of <span style="color:blue">LIFO (Last In, First Out)</span>.

> Key Characteristics:
> - Handles synchronous code.
> - If a function calls another function, the second function is pushed onto the stack.
> - JavaScript cannot move to the next task until the current stack is empty.
  
```ts
// ExampleStack.ts
console.log("Start");

function innerFunction() {
    console.log("Inner function end");
}
    
function outerFunction() {
    innerFunction();
    console.log("Outer function end");
}

outerFunction();

console.log("End");
```

![Example Stack](example-stack-12.png)
![Example Stack](example-stack-34.png)
![Example Stack](example-stack-56.png)

Example from tolobayo:
![Example Stack gif](example-stack-gif.gif)

## 2. Task Queue: Managing Asynchronous Code

The **task queue** (or **callback queue**) is where javascript stores asynchronous operations like <span style="color:blue">setTimeout</span> or events waiting to be executed. when the call stack is empty, the **event loop** (as coordinator) checks the task queue and moves tasks to the stack for execution.

> Key Characteristics:
> - Follows **FIFO** (First In, First Out).
> - Used for macrotasks like <span style="color:blue">setTimeout</span>, <span style="color:blue">setInterval</span>, and DOM events.

```ts
console.log("Start");

function InnerTimeOut() {
  console.log("Inner timeout end");
}

setTimeout(() => {
  InnerTimeOut()
}, 1000);

function outerFunction() {
    console.log("Outer function end");
}

outerFunction();

console.log("End");

```

![Example Stack](example-queue-12.png)
![Example Stack](example-queue-34.png)
![Example Stack](example-queue-56.png)
![Example Stack](example-queue-78.png)


## 3. Microtasks: The VIPs of Asynchronous Execution

Microtasks are high-priority tasks that are executed before macrotasks. Promises and <span style="color:blue">MutationObserver</span> callbacks are examples of microtasks. They are queued in the microtask queue, which is separate from the task queue.

> Key Characteristics:
> - Processed right after the current stack is empty but before any macrotasks.
> - Ensure a smoother execution of asynchronous tasks.

```ts
// ExampleMicroTask.ts
console.log("Start");

setTimeout(() => {
  console.log("Timer callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise resolved");
});

console.log("End");

```
Execution Flow:
1. "Start" is logged.
2. <span style="color:blue">setTimeout</span> schedules the callback in the task queue.
3. The promise's <span style="color:blue">.then()</span> schedules a microtask.
4. "End" is logged.
5. The microtask (<span style="color:blue">Promise resolved</span>) runs before the macrotask (<span style="color:blue">Timer callback</span>).

**Output:**
```python
Start
End
Promise resolved
Timer callback
```

## 4. Macrotasks: The Backbone of Asynchronous Execution
Macrotasks include tasks like <span style="color:blue">setTimeout</span>, <span style="color:blue">setInterval</span>, I/O tasks, and rendering. They are lower in priority compared to microtasks, meaning the event loop processes all pending microtasks before moving on to the next macrotask.

## 5. The Event Loop: The Conductor of the Orchestra
The **event loop** is a mechanism that coordinates the execution of tasks, microtasks, and rendering. Its primary role is to ensure that the JavaScript runtime doesn't block and keeps processing tasks efficiently.
**How the Event Loop Works:**
1. The event loop checks the **call stack**.
2. If the stack is empty, it processes all **microtasks** from the microtask queue.
3. Once microtasks are done, it moves to the **task queue** and processes the first macrotask.

>The characteristic of function execution in JS is that it will only stop when the function returns or throws an exception.

![Example Stack](example-eventloop.png)

Example from tolobayo:
![Example Stack gif](example-eventloop-gif.gif)

## 6. Why Does This Matter?
Understanding these concepts is crucial for:
- **Writing efficient asynchronous code**: Knowing when tasks execute helps prevent race conditions or unintended delays.
- **Debugging issues**: You can pinpoint where a promise or timeout is getting stuck.
- **Optimizing performance**: Microtasks run faster, so use them wisely for critical operations.

## Conclusion
The interplay between the call stack, task queue, microtasks, macrotasks, and the event loop forms the backbone of JavaScript's asynchronous behavior. By mastering these concepts, you’ll gain a deeper understanding of how JavaScript executes code and be better equipped to write performant and bug-free applications.

Got questions? Drop them in the comments! Happy coding! 🚀