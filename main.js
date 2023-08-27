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
            mutate() {
                const mutateLocation = Math.floor(Math.random() * 14);
                let mutatedBase = '';
                do {
                    mutatedBase = returnRandBase();
                } while (mutatedBase == this.dna[mutateLocation]);
                this.dna[mutateLocation] = mutatedBase;
            },
            compareDNA(otherDNA) {
                let count = 0;
                for (let i = 0; i < 15; i++) {
                    if (dna[i] == otherDNA[i]) count++;
                }
                console.log('\nSpecimen #1 and specimen #2 have ' + count / 15 * 100 + '% DNA in common');
            },
            willLikelySurvive() {
                let goodBases = 0;
                for (const base of dna) {
                    if (base == 'C' || base == 'G') goodBases++;
                }
                return goodBases / 15 >= .6 ? true : false;
            }};
}

// Generate array of 30 instances of pAequor
const orgArray = [];
for (let i = 1; i <= 30; i++) {
    orgArray.push(pAequorFactory(i, mockUpStrand()));
}

// Log pAequor array to console
for (const organism of orgArray) {
    console.log('Specimen: #' + organism.specimenNum + ' DNA: ' + organism.dna.join(''));
}

// Test object methods
orgArray[0].compareDNA(orgArray[1].dna);
console.log('Specimen #1 will likely survive: ' + orgArray[0].willLikelySurvive());
console.log('\n\nMutating specimen #1 DNA\n');
orgArray[0].mutate();
orgArray[0].compareDNA(orgArray[1].dna);
console.log('Specimen #1 will likely survive: ' + orgArray[0].willLikelySurvive());