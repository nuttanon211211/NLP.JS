
// Create 1-gram using words array
function create1gram(data) {
       let out = {};
       for (var i=0; i < data.length ; i++) {
         if (Object.keys(out).indexOf(data[i]) == -1) {
           out[data[i]] = 1;
         }
         else {
           out[data[i]] += 1;
         }
       }

       return out;
}

// Create 2-gram using words array
function create2gram(data) {
      let out = {};
      for (var i=1 ; i < data.length ; i++) {
        if (Object.keys(out).indexOf(data[i-1]) == -1) {
          var tmp = {};
          tmp[data[i]] = 1;
          out[data[i-1]] = tmp;

        }
        else if (Object.keys(out[data[i-1]]).indexOf(data[i]) == -1) {
          out[data[i-1]][data[i]] = 1;
        }
        else {
          out[data[i-1]][data[i]] += 1;
        }
      }

      return out;

    }

// Create 3-gram using words array
function create3gram(data) {
      let out = {};
      for (var i=2 ; i < data.length ; i++) {
        if (Object.keys(out).indexOf(data[i-2]+" "+data[i-1]) == -1) {
          var tmp = {};
          tmp[data[i]] = 1;
          out[data[i-2]+" "+data[i-1]] = tmp;

        }
        else if (Object.keys(out[data[i-2]+" "+data[i-1]]).indexOf(data[i]) == -1) {
          out[data[i-2]+" "+data[i-1]][data[i]] = 1;
        }
        else {
          out[data[i-2]+" "+data[i-1]][data[i]] += 1;
        }
      }

      return out;

    }

// Create 4-gram using words array
function create4gram(data) {
      let out = {};
      for (var i=3 ; i < data.length ; i++) {
        if (Object.keys(out).indexOf(data[i-3]+" "+data[i-2]+" "+data[i-1]) == -1) {
          var tmp = {};
          tmp[data[i]] = 1;
          out[data[i-3]+" "+data[i-2]+" "+data[i-1]] = tmp;

        }
        else if (Object.keys(out[data[i-3]+" "+data[i-2]+" "+data[i-1]]).indexOf(data[i]) == -1) {
          out[data[i-3]+" "+data[i-2]+" "+data[i-1]][data[i]] = 1;
        }
        else {
          out[data[i-3]+" "+data[i-2]+" "+data[i-1]][data[i]] += 1;
        }
      }

      return out;

    }

// Handle when recieve the message (Create n-gram)
self.onmessage = function(evt) {
    let d_out = {};
//     console.log(evt);
    if (evt.data[0] == 1) {
      d_out = create1gram(evt.data[1]);
    }
    if (evt.data[0] == 2) {
      d_out = create2gram(evt.data[1]);
    }
    if (evt.data[0] == 3) {
      d_out = create3gram(evt.data[1]);
    }
    if (evt.data[0] == 4) {
      d_out = create4gram(evt.data[1]);
    }
    self.postMessage(d_out);

}
