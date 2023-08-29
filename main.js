// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase());
    }
    return newStrand;
};

// Returns an object that contains the properties specimenNum and dna that correspond to the parameters provided
const pAequorFactory = (specimenNum, dna) => {
    return {specimenNum: specimenNum,
            dna: dna,
            mutate() { // mutates one randomly selected base in the dna strand
                const mutateLocation = Math.floor(Math.random() * (this.dna.length - 1));
                let mutatedBase = '';
                do {
                    mutatedBase = returnRandBase();
                } while (mutatedBase == this.dna[mutateLocation]);
                this.dna[mutateLocation] = mutatedBase;
            },
            compareDNA(otherOrg, output) { // compares two pAequor objects' DNA and optionally output result
                let count = 0;
                for (let i = 0; i < this.dna.length; i++) {
                    if (dna[i] == otherOrg.dna[i]) count++;
                }
                if (output != false) console.log(`Specimen #${this.specimenNum} and specimen #${otherOrg.specimenNum} have `
                 + count / this.dna.length * 100 + '% DNA in common');
                return count / this.dna.length * 100;
            },
            willLikelySurvive() { // decides if current object will survive
                let goodBases = 0;
                for (const base of dna) {
                    if (base == 'C' || base == 'G') goodBases++;
                }
                return goodBases / this.dna.length >= .6 ? true : false;
            },
            complementStrand() { // returns the complementary dna strand on the current object
                const compStrand = [];
                for (const base of dna) {
                    compStrand.push(base == 'A' ? 'T':
                                    base == 'T' ? 'A':
                                    base == 'C' ? 'G':
                                    base == 'G' ? 'C':
                                    null);
                }
                return compStrand;
            }};
}

// Generate array of 30 instances of pAequor that will likely survive
const orgArray = [];
let testOrganism = {};
for (let i = 1; i <= 30; i++) {
    do {
        testOrganism = pAequorFactory(i, mockUpStrand());
    } while (testOrganism.willLikelySurvive() == false);
    orgArray.push(testOrganism);
}

// Log pAequor array to console
for (const organism of orgArray) {
    console.log('Specimen: #' + organism.specimenNum + ' DNA: ' + organism.dna.join('')
    + ' Will likely survive: ' + organism.willLikelySurvive());
}

// Test mutate method
console.log();
orgArray[0].compareDNA(orgArray[2]);
console.log('Mutating specimen #1 DNA');
orgArray[0].mutate();
orgArray[0].compareDNA(orgArray[2]);

// Test complementStrand Method
console.log('\n\nTesting complementStrand method:');
console.log('Specimen #1 Strand: ' + orgArray[0].dna.join(''));
console.log('Complement Strand:  ' + orgArray[0].complementStrand().join(''));

// Find two most related instances of pAequor
const mostRelated = {orgamism1: 0, orgamism2: 0, percent: 0};
for (let i = 0; i < orgArray.length; i++) {
    for (let j = 0; j < orgArray.length; j++) {
        if (i != j && orgArray[i].compareDNA(orgArray[j], false) > mostRelated.percent) {
            mostRelated.orgamism1 = orgArray[i].specimenNum;
            mostRelated.orgamism2 = orgArray[j].specimenNum;
            mostRelated.percent = orgArray[i].compareDNA(orgArray[j], false);
        }
    }
}
console.log(`\nThe most related specimens are #${mostRelated.orgamism1} and #${mostRelated.orgamism2}`
 + ` with a match of ${mostRelated.percent}%`);