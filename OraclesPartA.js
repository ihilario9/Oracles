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



// This function tests a stable matching implementation 

//oracle(f: (companies: number[][], candidates: number[][]) => Hire[]): void

function oracle(func) {
  let testsNum = 20; 
  for (let int = 0; int < testsNum; ++int) {
    let num = 6; 
    let companies = generateInput(num);
    let candidates = generateInput(num);
    let hires = func(companies, candidates);
    test('Hires length: confirmed correct!', function() {
      assert(companies.length === hires.length);
      assert(candidates.length === hires.length);
    });

    test("Tests stability", function(){
      let stability = true;
      for(let x = 0; x < hires.length; ++x){  
        for(let y = 0; y < companies.length; ++y){          
          let company1 = hires[x].company, company2 = y;     
          let candidate1 = hires[x].candidate, candidate2 = -1;      

            for(let z = 0; z < hires.length; ++z){       
              if(hires[z].company === company2){
                candidate2 = hires[z].candidate;
              }
            }

          let companyPref = companies[company1];  
          let candidatePref = candidates[candidate2];

        if (companyPref.indexOf(candidate1) > companyPref.indexOf(candidate2) && 
        candidatePref.indexOf(company2) > candidatePref.indexOf(company1)
        ){
          stability = false;
        }
      }
    }
    assert(stability);
    });
  }

  testsNum = 400; 
  for (let i = 0; i < testsNum; ++i) {
    let num = 4; 
    let companies = generateInput(num);
    let candidates = generateInput(num);
    let hires = func(companies, candidates);
    test('Hires length: confirmed correct!', function() {
      assert(companies.length === hires.length);
      assert(candidates.length === hires.length);
    });

    test("Tests stability", function(){
      let stability = true;
      for(let x = 0; x < hires.length; ++x){  
        for(let y = 0; y < companies.length; ++y){          
          let company1 = hires[x].company, company2 = y;     
          let candidate1 = hires[x].candidate, candidate2 = -1;      

            for(let z = 0; z < hires.length; ++z){       
              if(hires[z].company === company2){
                candidate2 = hires[z].candidate;
              }
            }

          let companyPref = companies[company1];  
          let candidatePref = candidates[candidate2];

        if (companyPref.indexOf(candidate1) > companyPref.indexOf(candidate2) && 
        candidatePref.indexOf(company2) > candidatePref.indexOf(company1)
        ){
          stability = false;
        }
      }
    }
    assert(stability);
    });
  }

  testsNum = 150; 
  for (let i = 0; i < testsNum; ++i) {
    let num = 8; 
    let companies = generateInput(num);
    let candidates = generateInput(num);
    let hires = func(companies, candidates);
    test('Hires length: confirmed correct!', function() {
      assert(companies.length === hires.length);
      assert(candidates.length === hires.length);
    });

    test("Tests stability", function(){
      let stability = true;
      for(let x = 0; x < hires.length; ++x){  
        for(let y = 0; y < companies.length; ++y){          
          let company1 = hires[x].company, company2 = y;     
          let candidate1 = hires[x].candidate, candidate2 = -1;      

            for(let z = 0; z < hires.length; ++z){       
              if(hires[z].company === company2){
                candidate2 = hires[z].candidate;
              }
            }

          let companyPref = companies[company1];  
          let candidatePref = candidates[candidate2];

        if (companyPref.indexOf(candidate1) > companyPref.indexOf(candidate2) && 
        candidatePref.indexOf(company2) > candidatePref.indexOf(company1)
        ){
          stability = false;
        }
      }
    }
    assert(stability);
    });
  }
}

test('Check the randomInput', function(){
  let inputNum = 5;
  let giArray = generateInput(inputNum);
  assert(giArray.length === inputNum);
  
  for (let i = 0; i < inputNum; ++i){
    assert(giArray[i].length === inputNum);
    assert(giArray[i].includes(i))
  }
});


oracle(wheat1);
oracle(chaff1);




