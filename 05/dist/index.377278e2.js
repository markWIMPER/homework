class Trie {
    root = null;
    constructor(){
        this.root = Object.create(null);
    }
    insert(word) {
        let node = this.root;
        for (let c of word){
            // 没有对象创建对象
            if (!node[c]) node[c] = Object.create(null);
            // 有对象直接替换
            node = node[c];
        }
        // 处理特殊字符
        if (!("$" in node)) node["$"] = 0;
        node["$"]++;
    }
    most() {
        let max = 0;
        let word = null;
        let visit = (node, word)=>{
            if (node.$ && node.$ > max) //
            max = node.$;
        };
    }
}
const randomWord = (length = 0)=>{
    let s = "";
    for(let i1 = 0; i1 < length; i1++)s += String.fromCharCode(Math.random() * 26 + "a".charCodeAt(0));
    return s;
};
let trie = new Trie();
for(let i = 0; i < 1000; i++)trie.insert(randomWord(4));
// ____________________LR(0)______________________________
const parse = (source)=>{
    let stack = [];
    // debugger;
    for (let c of source){
        if (c === "(" || c === "[" || c === "{") stack.push(c);
        if (c === ")") {
            if (stack[stack.length - 1] === "(") stack.pop();
            else return false;
        }
        if (c === "]") {
            if (stack[stack.length - 1] === "[") stack.pop();
            else return false;
        }
        if (c === "}") {
            if (stack[stack.length - 1] === "{") stack.pop();
            else return false;
        }
    }
    if (stack.length === 0) return true;
    else return false;
};
// console.log(parse('(a)'), parse('(a'));
// ----------------KMP---------------
// Version_Classic
const find = (source, pattern)=>{
    for(let i2 = 0; i2 < source.length; i2++){
        let matched = true;
        for(let j = 0; j < source.length; j++)if (source[i2 + j] !== pattern) {
            matched = true;
            break;
        }
        if (matched) return true;
    }
    return false;
};
// console.log(find('abcxyz', 'xy')); -> true
// Effective
const find2 = (source, pattern)=>{
    let table = new Array(pattern.length).fill(0);
    let k = 0;
    for(let j = 1; j < pattern.length; j++){
        if (pattern[j] === pattern[k]) k++;
        table[j] = k;
    }
    console.log(table);
    let j1 = 0;
    for(let i3 = 0; i3 < source.length; i3++){
        console.log(source[i3], pattern[j1], j1);
        if (source[i3] === pattern[j1]) j1++;
        else {
            while(source[i3] !== pattern[j1] && j1 > 0)j1 = table[j1 - 1];
            if (source[i3] === pattern[j1]) j1++;
            else j1 = 0;
        }
        if (j1 === pattern.length) return true;
    }
    return false;
};
console.log(find2("abcabcabx", "abcabx"));
//------------------------------------------
const wildcard = (source, pattern)=>{
    let startCount = 0;
    for(let i6 = 0; i6 < pattern.length; i6++)if (pattern[i6] === "*") startCount++;
    if (startCount === 0) {
        let matched = true;
        for(let i7 = 0; i7 < pattern.length; i7++){
            if (pattern[i7] !== source[i7] && pattern[i7] !== "?") return false;
        }
        return;
    }
    let i4 = 0;
    let j = 0;
    for(let i5 = 0; pattern[i5] !== "*"; i5++){
        if (pattern[i5] !== source[i5] && pattern[i5] !== "?") return false;
    }
    let lastIndex = i4;
    for(let p = 0; p < startCount - 1; p++){
        i4++;
        let subPattern = "";
        while(pattern[i4] !== "*")subPattern += pattern[i4];
        let reg = new RegExp(subPattern.replace(/\?/g, "[\\s\\S]"));
        reg.lastIndex = lastIndex;
        console.log(reg.exec(source));
        lastIndex = reg.lastIndex;
    }
    for(let j2 = 0; j2 <= source.length - lastIndex && pattern[pattern.length - j2] !== "*"; j2--){
        if (pattern[pattern.length - j2] !== source[source.length - j2] && pattern[pattern[pattern.length - j2]] !== "?") return false;
    }
    return true;
};
wildcard("abcabcabx", "a*b*?x*c");

//# sourceMappingURL=index.377278e2.js.map
