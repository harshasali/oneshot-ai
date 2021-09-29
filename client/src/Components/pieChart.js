import React,{Component} from 'react';

import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export
} from 'devextreme-react/pie-chart';

class PieCharts extends Component { 

  render() {
    return (
      <PieChart
        id="pie"
        dataSource={this.props.data}
        palette="Bright"
        title={this.props.title}
        onPointClick={this.pointClickHandler}
        onLegendClick={this.legendClickHandler}
      >
        <Series
          argumentField="value"
          valueField="percentage"
        >
          <Label visible={true}>
            <Connector visible={true} width={1} />
          </Label>
        </Series>

        <Size width={500} />
        <Export enabled={true} />
      </PieChart>
    );
  }

  pointClickHandler = (e) =>{
    window.location.href = '/'+this.props.path+'/'+e.target.data.value;
  }

  legendClickHandler= (e) =>{
    window.location.href = '/'+this.props.path+'/'+e.target;
  }

}

export default PieCharts;