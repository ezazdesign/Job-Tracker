## Answers to the Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

getElementById, getElementsByClassName, querySelector / querySelectorAll এর পার্থক্য হলো:-

getElementById("id") এটা শুধু একটি নির্দিষ্ট id দিয়ে element খুঁজে আনে সবসময় একটাই element রিটার্ন করে
খুব দ্রুত কাজ করে।

getElementsByClassName("class") এটা শুধু একই class থাকা সব element নিয়ে আসে, এটি HTMLCollection রিটার্ন করে (array-এর মতো কিন্তু পুরো array না), এটা DOM পরিবর্তন হলে কালেকশনও অটোমেটিক আপডেট হয়।

querySelector("selector") এটা যেকোনো CSS selector ব্যবহার করা যায় (id, class, tag, attribute, nested selector সব) মিলে গেলে প্রথম element রিটার্ন করে না পেলে null দেয়।

querySelectorAll("selector") এটা যেকোনো CSS selector ব্যবহার করা যায় মিলে গেলে NodeList রিটার্ন করে, এটা DOM পরিবর্তন হলে অটোমেটিক আপডেট হয় না।

### 2. How do you create and insert a new element into the DOM?

Step 1: createElement() ব্যবহার করে নতুন element তৈরি করা হয়।
const newElement = document.createElement("p");
Step 2: appendChild() ব্যবহার করে element টি DOM-এ insert করা।
newElement.innerHTML = "Hello World";
Step 3: DOM-এ insert করা
document.body.appendChild(newElement);

### 3. What is Event Bubbling? And how does it work?

Event Bubbling হলো এমন একটি প্রক্রিয়া যেখানে কোনো element-এ event ঘটলে সেটি প্রথমে ওই element-এ ট্রিগার হয় এবং তারপর পর্যায়ক্রমে তার parent element-গুলোতে ছড়িয়ে পড়ে। এটি DOM tree-র নিচ থেকে উপরের দিকে (bubble-এর মতো) প্রবাহিত হয়।

এটি যেভাবে কাজ করে:
১. প্রথমে target element-এর event handler কল হয়।
২. এরপর তার parent element-এর handler কল হয়।
৩. এভাবে পর্যায়ক্রমে একদম root পর্যন্ত event টি পৌঁছায়।

উদাহরণস্বরূপ, যদি একটি button একটি div এর ভেতরে থাকে এবং আপনি button এ ক্লিক করেন, তবে প্রথমে button এর click event কাজ করবে, তারপর div এর, এবং সবশেষে body এর event কাজ করবে।

### 4. What is Event Delegation in JavaScript? Why is it useful?

Event Delegation হলো এমন একটি কৌশল, যেখানে একটি parent element-এর উপর event listener যোগ করে তার ভেতরের child element গুলোর event পরিচালনা করা হয়। এক্ষেত্রে প্রতিটি child element এর জন্য আলাদা আলাদা listener যোগ না করে, parent এর listener event টিকে bubble করে উপরে উঠে আসা event গুলোকে handle করে।

এটি যেভাবে কাজ করে:
১. একটি parent element এ event listener যোগ করা হয়।
২. যখন কোনো child element এ event ঘটে, তখন সেটি bubble হয়ে parent এ পৌঁছায়।
৩. parent এর listener তখন event টির target element শনাক্ত করে এবং সেই অনুযায়ী কাজ করে।

এটি কেন উপযোগী:

১. অনেকগুলো element-এর জন্য আলাদা listener লাগে না, ফলে memory কম খরচ হয় Performance ভালো হয় ।
২. Dynamic Content করতে পারে কারণ JavaScript দিয়ে নতুন element যোগ করলে আলাদা করে listener বসাতে হয় না। Parent নিজে থেকেই ধরতে পারে।
৩. কোড অনেক কম লিখতে হয়, clean ও maintainable হয়।

### 5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() এবং stopPropagation() দুটি ভিন্ন মেথড যা event handling-এ ব্যবহৃত হয়। এদের মধ্যে প্রধান পার্থক্য হলো:

preventDefault() event-এর default behaviour বন্ধ করে দেয়।
যেমন: একটি লিংকে (<a> tag) ক্লিক করলে সাধারণত সেটি অন্য পেইজে নিয়ে যায়। কিন্তু preventDefault() ব্যবহার করলে লিংকে ক্লিক করলেও সেটি কোথাও যাবে না।
এটি event-টিকে bubble হওয়া থেকে আটকায় না, অর্থাৎ event bubble process চলতে থাকে।

stopPropagation() event টিকে bubble হয়ে parent element গুলোতে যাওয়া থেকে আটকায় event-টিকে bubble process থেকে বের করে দেয়। এটি event-এর default behaviour বন্ধ করে না।
