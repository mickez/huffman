var CodedDisplay = React.createClass({

    render: function() {

        var cards = this.props.coded.map(function(element) {
            return <CodeCard element={element}></CodeCard>;
        });

        return (
            <div>
                <p>Before coding: {this.props.oriBits} bits, after coding: {this.props.newBits}, saving: {(this.props.newBits / this.props.oriBits * 100).toFixed(2)} % of original size</p>
                <div className="codedDisplay">
                    {cards}
                </div>
            </div>
        );
    }

});

var CodeCard = React.createClass({

    render: function() {
        return (
            <div className="codeCard">
                <p>Letter: "{this.props.element.letter}"</p>
                <p>Code: {this.props.element.code}</p>
                <p>Bits: {this.props.element.code.length}</p>
            </div>
        );
    }

});

var target = document.getElementById('app');


function renderApp(coding, oriBits, newBits) {
    React.render(<CodedDisplay coded={coding} oriBits={oriBits} newBits={newBits}></CodedDisplay>, target);
}

function calcSaving(str, coding) {
    var freq = {}, i;
    for (i = 0; i < str.length; i++) {
        if (!freq[str[i]]) {
            freq[str[i]] = 1;
        } else {
            freq[str[i]]++;
        }
    }

    var bits = 0;
    for (i = 0; i < coding.length; i++) {
        bits += freq[coding[i].letter] * coding[i].code.length;
    }

    return bits;
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


function onInput(event) {
    if (event.target.value.length > 2) {
        var ensemble = generateEnsemble(event.target.value);
        var coding = _.sortByOrder(huffman(ensemble), 'prob', false);

        renderApp(coding, event.target.value.length * 8, calcSaving(event.target.value, coding));
    }
}

document.getElementById('input').addEventListener('input', onInput);

