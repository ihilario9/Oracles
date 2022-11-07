//generateInput(n: number): number[][]
function generateInput(num){

  let giArray = [];

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  

  //for loop, can I use a hof here?
  for (let int = 0; int <= num-1; ++int){
    giArray.push([]);
    while( giArray[int].length < num){
      let r = randomInt(0, num);
      if ( giArray[int].includes(r) === false ){
        giArray[int].push(r);
      }
    }
  }
  console.log(giArray);
  return giArray;
  //will return a random integer int
}
generateInput(3);


//runOracle(f: (companies: number[][], candidates: number[][]) => Run): void

function runOracle(f){
  let testsNum = 20; 
  for (let i = 0; i < testsNum; ++i) {
    let num = 3; 
    let companies = generateInput(num);
    let candidates = generateInput(num);
    let run = f(companies, candidates);
    
    //tracingValid function begins
    function tracingValid(trace){
      
      let candidCurr = []; 
      let candidComp = [];
      let finalArr = [];
      
      //successive function begins
      function successive(succArr, p){
        if(succArr[succArr.indexOf(p)] === -1){
          return false;
        }
        let x = 0;
        for(let i = 0; i < succArr.length; ++i){
          if(succArr[i] !== -1){
            break;
          }
          else{
            ++x;
          }
        }
        if(succArr.indexOf(p) !== x){
          return false;
        }
        return true;
      } //successive function ends

      //algorithm function begins
      function algorithm(from, to, c1, c2, trackFrom, trackTo, combArr, fromCo){
        
        //findMatch function begins
        function findMatch(to, fromCo){
          for(let i = 0; i < combArr.length; ++i){
            if(fromCo && (combArr[i].candidate === to)){
             return i;
            }
            else if(!fromCo && (combArr[i].company === to)){
              return i;
            }
          }
        } //findMatch function ends
        
        if(trackFrom.indexOf(from) !== -1){
          if(combArr.length === 0){
            combArr.push({company: -1, candidate: -1});
            return;
          }
          else{
            combArr[0] = {company: -1, candidate: -1};
            return;
          }
        }
        
        else if(successive(c1[from], to) === false){
          if(combArr.length === 0){
            combArr.push({company: -1, candidate: -1});
            return;
          }
          else{
            combArr[0] = {company: -1, candidate: -1};
            return;
          }
        }
        
        else if(trackTo.indexOf(to) === -1){
          trackFrom.push(from);
          trackTo.push(to);
          c1[from][c1[from].indexOf(to)] = -1;
          if(fromCo){
            combArr.push({company: from, candidate: to});
            return;
          }
          else{
            combArr.push({company: to, candidate: from});
            return;
          }
        }
        else{
          let index = findMatch(to, fromCo);
          let currHire = combArr[index];
          let pref = c2[to].indexOf(from);
         
          if(fromCo){
            let currPart = currHire.company;
            let currPref = c2[to].indexOf(currPart);
            if(currPref < pref){
              c1[from][c1[from].indexOf(to)] = -1;
              return;
            }
            else{
              trackFrom.push(from);
              c1[from][c1[from].indexOf(to)] = -1;
              combArr.splice(index, 1);
              if(fromCo){
               let ind = trackFrom.indexOf(currHire.company);
               trackFrom.splice(ind, 1);
              
               combArr.push({company: from, candidate: to});
               return;
              }
              else{
               let ind = trackFrom.indexOf(currHire.candidate);
               trackFrom.splice(ind, 1);
              
               combArr.push({company: to, candidate: from});
               return;
              }
            }
          }
          else{
            let currPart = currHire.candidate;
            let currPref = c2[to].indexOf(currPart);
            if(currPref < pref){
              c1[from][c1[from].indexOf(to)] = -1;
              return;
            }
            else{
              trackFrom.push(from);
              c1[from][c1[from].indexOf(to)] = -1;
              combArr.splice(index, 1);
              if(fromCo){
               let ind = trackFrom.indexOf(currHire.company);
               trackFrom.splice(ind, 1);
              
               combArr.push({company: from, candidate: to});
               return;
              }
              else{
               let ind = trackFrom.indexOf(currHire.candidate);
               trackFrom.splice(ind, 1);
              
               combArr.push({company: to, candidate: from});
               return;
              }
            }
            return;
          } 
        }
      } //algorithm function ends
      
      for(let i = 0; i < trace.length; ++i){
        let offer = trace[i];
        let from = offer.from;
        let to = offer.to;
        let fromCo = offer.fromCo;
        if(fromCo === true){
          algorithm(from, to, companies, candidates, candidComp, candidCurr, finalArr, fromCo);
          
          if(finalArr[0].company === -1){
            break;
          }
        }
        else{
          algorithm(from, to, candidates, companies, candidCurr, candidComp, finalArr, fromCo);
          if(finalArr[0].company === -1){
            break;
          }
        }
      }
      return finalArr;
    } //tracingValid function ends

    let output = tracingValid(run.trace);

    test('result of matching in trace is the output(finalArr)', function(){
      let boole = false;
      for(let i = 0; i < output.length; ++i){
        let boole2 = false;
        for(let j = 0; j < run.out.length; ++j){
          if(run.out[j].candidate === output[i].candidate && output[i].company === run.out[j].company){
            boole2 = true;
          }
        }
        if(!boole2){
          break;
        }
        else{
          boole = true;
        }
      }
    });

    test('FinalArr(output) correct', function(){
      if(output[0].company === -1){
        assert(false);
      }
      assert(true);
    });

    test('Length is correct', function(){
      if(output.length !== run.out.length){
        assert(false);
      }
      else{
        assert(true);
      }
    });
  }
} //runOracle function ends

const oracleLib = require('oracle');
runOracle(oracleLib.traceWheat1);
runOracle(oracleLib.traceChaff1);