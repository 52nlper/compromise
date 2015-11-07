let {Tab, Tabs, Grid, Row, Col, Input} = ReactBootstrap;

let colours = {
  Noun: 'steelblue',
  Adjective: '#e5762b',
  Verb: 'darkseagreen',
  Adverb: 'mediumturquoise',
  Person: 'cornflowerblue',
  Place: 'cornflowerblue',
  Value: 'lightsalmon',
  Date: 'lightcoral',
};


let Home = React.createClass({

  getInitialState: function () {
    return {
      text: this.props.text || '',
      result: {},
      show: this.props.show || 'Noun'
    };
  },
  componentDidMount: function () {
    this.fetch('Clinton_1998');
  },

  fetch: function (file) {
    let cmp = this;
    $.get('./texts/' + file + '.txt', function (txt) {
      cmp.state.text = txt;
      cmp.state.result = nlp.Text(txt);
      console.log(cmp.state.result);
      cmp.setState(cmp.state);
    });
  },

  underline: function (pos) {
    this.state.show = pos;
    this.setState(this.state);
  },

  pickTexts: function () {
    let cmp = this;
    let texts = [
      'Clinton_1998', 'Clinton_1999', 'Clinton_2000',
      'Bush_2001', 'Bush_2002', 'Bush_2003', 'Bush_2004', 'Bush_2005', 'Bush_2006', 'Bush_2007', 'Bush_2008',
      'Obama_2009', 'Obama_2010', 'Obama_2011', 'Obama_2012', 'Obama_2013', 'Obama_2014', 'Obama_2015',
    ];
    let tabs = texts.map(function(s, i) {
      return <Tab key={i} eventKey={s} title={s}>{s}</Tab>;
    });
    return (
      <Tabs activeKey={texts[0]} onSelect={this.fetch} position="left" tabWidth={12} animation={false}>
        {tabs}
      </Tabs>
      );
  },

  isHighlighted: function(t, str) {
    if (t.pos[str]) {
      return true;
    }
    return false;
  },

  result: function() {
    let cmp = this;
    let sentence_css = {
      padding: 10,
    };
    let sentences = (this.state.result.sentences || []).map(function(s, key) {
      let terms = s.terms.map(function(t, i) {
        let css = {
          margin: 5,
          borderBottom: '2px solid white'
        };
        if (cmp.isHighlighted(t, cmp.state.show)) {
          css.borderBottom = '2px solid ' + colours[cmp.state.show];
        }
        return <span style={css} key={i} title={t.tag + '  ' + t.reason}>{t.text}</span>;
      });
      return (
        <div style={sentence_css} key={key}>
          {terms}
        </div>
        );
    });

    let actions = [
      'Noun',
      'Adjective',
      'Verb',
      'Person',
      'Place',
      'Date',
      'Value',
    ];
    let tabs = actions.map(function(s, i) {
      return <Tab key={i} eventKey={s} title={s}></Tab>;
    });
    return (
      <div>
        <Tabs bsStyle="pills" animation={false} onSelect={this.underline}>
          {tabs}
        </Tabs>
        <div>
          {sentences}
        </div>
      </div>
      );
  },

  render: function () {
    let cmp = this;
    let state = this.state;
    let css = {
      grid: {
        width: '100%',
        height: '100%',
      },
    };
    return (
      <Grid flex={true} style={css.grid}>
        <Row>
          <Col md={12} >
            {'State of the Union - nlp_compromise '}
            {'v2'}
          </Col>
        </Row>

        <Row>
          <Col md={3} >
              {this.pickTexts()}
          </Col>
          <Col md={9}>
            {this.result()}
          </Col>
        </Row>

      </Grid>
      );
  }

});


window.setTimeout(function () {
  ReactDOM.render(
    <Home/>,
    document.getElementById('main')
  );
}, 500);
