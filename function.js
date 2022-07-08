// Generate next word using 2 gram
function gen2(prefix,gram_data1,gram_data2) {

    if (Object.keys(gram_data2).indexOf(prefix) == -1) {
        console.log(Object.keys(gram_data1));
        console.log(Object.values(gram_data1));
        //Object.keys(gram_data1), Object.values(gram_data1);

        return weightRandom(Object.keys(gram_data1), Object.values(gram_data1));

    }
    let out = gram_data2[prefix];
    return weightRandom(Object.keys(out), Object.values(out));
}

// Generate next word using 3 gram
function gen3(prefix, gram_data3) {
    if (Object.keys(gram_data3).indexOf(prefix) == -1) {

        return "<NO_DATA>";
    }

    let out = gram_data3[prefix];
    return weightRandom(Object.keys(out), Object.values(out));
}

// Generate next word using 4 gram
function gen4(prefix, gram_data4) {
    if (Object.keys(gram_data4).indexOf(prefix) == -1) {
        return "<NO_DATA>";
    }

    let out = gram_data4[prefix];
    return weightRandom(Object.keys(out), Object.values(out));
}

// Generate next N-words (num-seq) using 2 gram
function gen2gen(prefix0,num_seq,gram_data1,gram_data2) {
    let text = prefix0.split(" ");
    prefix =text[text.length - 1];
    let gen = [];

    for (var i=0 ; i<num_seq ; i++) {
        prefix = gen2(prefix, gram_data1, gram_data2);
        gen.push(prefix);
    }
    gen = cleanData(gen);
    return prefix0 + " " + gen.join(" ");

}

// Generate next N-words (num-seq) using 3 gram
function gen3gen(prefix0, num_seq, gram_data1, gram_data2, gram_data3 ) {
    let text = prefix0.split(" ");
    console.log(text);
    let prefix = String(text[text.length -1]);
    let prefix2 = String(text[text.length -2]);
    let stack = [prefix2 , prefix];

    let gen = [];
    let gen_w = "";
    let key= "";
    let gen_w2 = "";

    for (var i=0 ; i<num_seq ; i++) {
        key = String(stack[stack.length-2])+" "+String(stack[stack.length-1]);
        console.log(key);
        gen_w = gen3(key, gram_data3);

        //console.log(prefix2,prefix,gen_w);
        if (gen_w == "<NO_DATA>" ) {
            gen_w2 = String( gen2(String(stack[stack.length-1]), gram_data1, gram_data2) );
            gen.push(gen_w2);
            console.log("fb 2g",String(gen_w2));
            stack.push(gen_w2);

        }
        else {
            console.log("using 3g")
            gen.push(gen_w);
            stack.push(gen_w);

        }


    }
    console.log(stack);
    gen = cleanData(gen);
    return prefix0 + " " + gen.join(" ");
}


// Generate next N-words (num-seq) using 4 gram
function gen4gen(prefix0, num_seq, gram_data1, gram_data2, gram_data3, gram_data4) {
    let text = prefix0.split(" ");
    console.log(text);
    let prefix = String(text[text.length -1]);
    let prefix2 = String(text[text.length -2]);
    let prefix3 = String(text[text.length -3]);
    let stack = [prefix3, prefix2 , prefix];

    let gen = [];
    let gen_w = "";
    let key= "";
    let gen_w2 = "";
    let gen_w3 = "";
    for (var i=0 ; i<num_seq ; i++) {


        key = String(stack[stack.length -3])+" "+ String(stack[stack.length-2])+" "+String(stack[stack.length-1]);
        console.log(key);
        gen_w = gen4(key, gram_data4);

        //console.log(prefix2,prefix,gen_w);
        if (gen_w == "<NO_DATA>" ) {
            gen_w3 = gen3(String(stack[stack.length-2])+" "+String(stack[stack.length-1]), gram_data3);
            if (gen_w3 != "<NO_DATA>") {
              gen.push(gen_w3);
              console.log("fb 3g",String(gen_w3));
              stack.push(gen_w3);

            }
            else {
              gen_w2 = String( gen2(String(stack[stack.length-1]), gram_data1, gram_data2) );
              gen.push(gen_w2);
              console.log("fb 2g",String(gen_w2));
              stack.push(gen_w2);
            }

        }
        else {
            console.log("using 4g")
            gen.push(gen_w);
            stack.push(gen_w);

        }


    }
    console.log(stack);
    gen = cleanData(gen);
    return prefix0 + " " + gen.join(" ");
}

// Handle generation button
function gen() {
    let prefix = document.getElementById('in_text').value;
    let len = document.getElementById('length').value ;
    if (document.getElementById('2gram').checked) {
    document.getElementById('out').innerHTML = "<i>gen: </i><br>" + gen2gen(prefix, Number(len), DATA, DATA2);
    }
    else if (document.getElementById('3gram').checked ) {
    document.getElementById('out').innerHTML = "<i>gen: </i><br>" + gen3gen(prefix, Number(len), DATA, DATA2, DATA3);
    }
    else if (document.getElementById('4gram').checked) {
    document.getElementById('out').innerHTML = "<i>gen: </i><br>" + gen4gen(prefix, Number(len), DATA, DATA2, DATA3, DATA4);
    }
    else {
    document.getElementById('out').innerHTML = "<i>gen</i>(default 3-Gram): <br>" + gen3gen(prefix, Number(len), DATA, DATA2, DATA3);
    }
}

// Randomly select the element in the list by weight
function weightRandom(list, w) {
    let sum = 0.0;
    for (var i = 0 ; i < w.length; i ++) {
        sum += w[i];
    }

    console.log(sum);

    let cumsum = [];
    let c_sum = 0.0;

    for (var i = 0 ; i < w.length; i ++) {
        c_sum += w[i];
        cumsum.push(c_sum/sum);
    }
    console.log(cumsum);

    let r_number = Math.random();

    console.log(r_number);

    for (var i = 0 ; i < w.length; i ++) {
        if (r_number < cumsum[i]) {
            return list[i]
        }
    }

    return "<NO_DATA>";
}

// Clean the data by replacing '_..._' with '<em>...</em>'
function cleanData(list) {
    let out = [];
    for (var i=0 ; i < list.length ; i++) {
        if (list[i].endsWith("_") && list[i].startsWith("_")) {
            out.push("<em>"+strip(list[i])+"</em>");
        }
        else {
            out.push(list[i]);
        }
    }
    return out;
}

// Strip the beginning and the end characters of the string
function strip(str) {
    let out = "";
    for (var i=1; i < str.length -1 ; i++) {
       out += str[i];
    }
    return out;
}
