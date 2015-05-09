/* globals _:false */
(function() {
    'use strict';

    function leastProb(ensemble) {
        var leastProb1, leastProb2;

        _.forEach(ensemble, function(element) {

            if (!leastProb1 || element.prob < leastProb1.prob) {
                if (!leastProb2 || leastProb1.prob < leastProb2.prob) {
                    leastProb2 = leastProb1;
                }

                leastProb1 = element;

            } else if (!leastProb2 || element.prob < leastProb2.prob) {
                leastProb2 = element;
            }

        });

        return _.clone([leastProb1, leastProb2]);
    }

    function parseTree(tree, code) {
        code = (code || '');
        code += tree.code;

        if (tree.letter.constructor === String) {
            tree = _.clone(tree);
            tree.code = code;
            return tree;
        }

        var ensemble = [];
        for (var i = 0; i < tree.letter.length; i++) {
            ensemble = ensemble.concat(parseTree(tree.letter[i], code));
        }
        return ensemble;
    }

    function huffman(ensemble, tree) {
        ensemble = _.clone(ensemble);

        if (!tree) {
            tree = [];
        }

        var lProbs = leastProb(ensemble);

        lProbs[0].code = 0;
        lProbs[1].code = 1;

        tree.push(lProbs);

        _.remove(ensemble, function(ele) {
            for (var i = 0; i < lProbs.length; i++) {
                if (ele.letter === lProbs[i].letter) {
                    return true;
                }
            }

            return false;
        });

        ensemble.push({
            prob: lProbs[0].prob + lProbs[1].prob,
            letter: [lProbs[0], lProbs[1]]
        });

        if (ensemble.length === 1) {
            ensemble[0].code = '';
            return parseTree(ensemble[0]);
        }

        return huffman(ensemble, tree);
    }

    function generateEnsemble(str) {
        var letters = {}, ensemble = [];
        for (var i = 0; i < str.length; i++) {
            if (!letters[str[i]]) {
                letters[str[i]] = 1;
            } else {
                letters[str[i]]++;
            }
        }

        _.forEach(letters, function(freq, letter) {
            ensemble.push({
                letter: letter,
                prob: freq / str.length
            });
        });

        return ensemble;
    }

    window.huffman = huffman;
    window.generateEnsemble = generateEnsemble;

})();