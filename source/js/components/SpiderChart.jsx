import React from 'react';
import d3 from 'd3';

let xAxisCounter = 0;
let yAxisCounter = 0;

export default class ScatterPlot extends React.Component {
    static propTypes = {
        data: React.PropTypes.array.isRequired
    };

    constructor() {
        super();
    }

    // Since the render method contains .append() invocations, I remove any child of the root node at each render
    componentWillUpdate() {
        // each update, flush the nodes of the chart - this isn't the best way - see the other example for better practice
        while (this.rootNode.firstChild) {
            this.rootNode.removeChild(this.rootNode.firstChild);
        }
    }

    drawSpiderChart(id, data, options) {
        const cfg = {
            w: 190, //Width of the circle
            h: 190, //Height of the circle
            margin: { top: 20, right: 20, bottom: 20, left: 20 }, //The margins of the SVG
            levels: 4, //How many levels or inner circles should there be drawn
            maxValue: 1, //What is the value that the biggest circle will represent
            labelFactor: 1.6, //How much farther than the radius of the outer circle should the labels be placed
            wrapWidth: 200, //The number of pixels after which a label needs to be given a new line
            opacityArea: 0.35, //The opacity of the area of the blob
            dotRadius: 4, //The size of the colored circles of each blog
            opacityCircles: 0.1, //The opacity of the circles of each blob
            strokeWidth: 2, //The width of the stroke around each blob
            roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
            color: d3.scale.category10() //Color function
        };

        for (const axis of data[0]) {
            axis.position = { x: 0, y: 0 };
        }

        //Put all of the options into cfg
        if ('undefined' !== typeof options) {
            for (const i in options) {
                if ('undefined' !== typeof options[i]) {
                    cfg[i] = options[i];
                }
            } //for i
        } //if

        //If the supplied maxValue is smaller than the actual one, replace by the max in the data
        const maxValue = Math.max(
            cfg.maxValue,
            d3.max(data, function(i) {
                return d3.max(
                    i.map(function(o) {
                        return o.value;
                    })
                );
            })
        );

        const allAxis = data[0].map(function(i, j) {
            return i.axis;
        }), //Names of each axis
            total = allAxis.length, //The number of different axes
            radius = Math.min(cfg.w / 2, cfg.h / 2), //Radius of the outermost circle
            Format = d3.format('%'), //Percentage formatting
            angleSlice = Math.PI * 2 / total; //The width in radians of each "slice"

        //Scale for the radius
        const rScale = d3.scale.linear().range([0, radius]).domain([0, maxValue]);

        const g = d3
            .select(this.rootNode)
            .append('g')
            .attr(
                'transform',
                'translate(' +
                    (cfg.w / 2 + cfg.margin.left) +
                    ',' +
                    (cfg.h / 2 + cfg.margin.top) +
                    ')'
            );

        //Filter for the outside glow
        const filter = g.append('defs').append('filter').attr('id', 'glow'),
            feGaussianBlur = filter
                .append('feGaussianBlur')
                .attr('stdDeviation', '2.5')
                .attr('result', 'coloredBlur'),
            feMerge = filter.append('feMerge'),
            feMergeNode_1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur'),
            feMergeNode_2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        /////////////////////////////////////////////////////////
        /////////////// Draw the Circular grid //////////////////
        /////////////////////////////////////////////////////////

        //Wrapper for the grid & axes
        const axisGrid = g.append('g').attr('class', 'axisWrapper');

        //Draw the background circles
        axisGrid
            .selectAll('.levels')
            .data(d3.range(1, cfg.levels + 1).reverse())
            .enter()
            .append('circle')
            .attr('class', 'gridCircle')
            .attr('r', function(d, i) {
                return radius / cfg.levels * d;
            })
            .style('fill', '#CDCDCD')
            .style('stroke', '#CDCDCD')
            .style('fill-opacity', cfg.opacityCircles)
            .style('filter', 'url(#glow)');

        //Text indicating at what % each level is
        axisGrid
            .selectAll('.axisLabel')
            .data(d3.range(1, cfg.levels + 1).reverse())
            .enter()
            .append('text')
            .attr('class', 'axisLabel')
            .attr('x', 4)
            .attr('y', function(d) {
                return (-d) * radius / cfg.levels;
            })
            .attr('dy', '0.4em')
            .style('font-size', '10px')
            .attr('fill', '#737373')
            .text(function(d, i) {
                return Format(maxValue * d / cfg.levels);
            });

        /////////////////////////////////////////////////////////
        //////////////////// Draw the axes //////////////////////
        /////////////////////////////////////////////////////////

        //Create the straight lines radiating outward from the center
        const axis = axisGrid
            .selectAll('.axis')
            .data(allAxis)
            .enter()
            .append('g')
            .attr('class', 'axis');
        //Append the lines
        axis
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', function(d, i) {
                return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
            })
            .attr('y2', function(d, i) {
                return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
            })
            .attr('class', 'line')
            .style('stroke', 'white')
            .style('stroke-width', '2px');

        //Append rect that will server as background for labels
        axis
            .append('rect')
            .attr('x', function(d, i) {
                let xCoord = rScale(maxValue * cfg.labelFactor) *
                    Math.cos(angleSlice * i - Math.PI / 2);
                let xCoordOffset = 66;
                if (xAxisCounter == 1) {
                    xCoord += 30;
                }
                if (xAxisCounter == 4) {
                    xCoord -= 20;
                    xCoordOffset += 20;
                }
                data[0][xAxisCounter].position.x = xCoord;
                xAxisCounter++;
                return xCoord - xCoordOffset;
            })
            .attr('y', function(d, i) {
                let yCoord = rScale(maxValue * cfg.labelFactor) *
                    Math.sin(angleSlice * i - Math.PI / 2);
                if (yAxisCounter == 0) {
                    yCoord += 15;
                }
                data[0][yAxisCounter].position.y = yCoord;
                yAxisCounter++;
                return yCoord - 20;
            })
            .attr('width', 140)
            .attr('height', 37);

        //Append the labels at each axis
        axis
            .append('text')
            .attr('class', 'legend')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .attr('x', function(d, i) {
                return data[0][i].position.x;
            })
            .attr('y', function(d, i) {
                return data[0][i].position.y;
            })
            .text(function(d) {
                return d;
            })
            .call(wrap, cfg.wrapWidth);

        /////////////////////////////////////////////////////////
        ///////////// Draw the radar chart blobs ////////////////
        /////////////////////////////////////////////////////////

        //The radial line function
        const radarLine = d3.svg.line
            .radial()
            .interpolate('linear-closed')
            .radius(function(d) {
                return rScale(d.value);
            })
            .angle(function(d, i) {
                return i * angleSlice;
            });

        if (cfg.roundStrokes) {
            radarLine.interpolate('cardinal-closed');
        }

        //Create a wrapper for the blobs
        const blobWrapper = g
            .selectAll('.radarWrapper')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'radarWrapper');

        //Append the backgrounds
        blobWrapper
            .append('path')
            .attr('class', 'radarArea')
            .attr('d', function(d, i) {
                return radarLine(d);
            })
            .style('fill', function(d, i) {
                return cfg.color(i);
            })
            .style('fill-opacity', cfg.opacityArea)
            .on('mouseover', function(d, i) {
                //Dim all blobs
                d3.selectAll('.radarArea').transition().duration(200).style('fill-opacity', 0.1);
                //Bring back the hovered over blob
                d3.select(this).transition().duration(200).style('fill-opacity', 0.7);
            })
            .on('mouseout', function() {
                //Bring back all blobs
                d3
                    .selectAll('.radarArea')
                    .transition()
                    .duration(200)
                    .style('fill-opacity', cfg.opacityArea);
            });

        //Create the outlines
        blobWrapper
            .append('path')
            .attr('class', 'radarStroke')
            .attr('d', function(d, i) {
                return radarLine(d);
            })
            .style('stroke-width', cfg.strokeWidth + 'px')
            .style('stroke', function(d, i) {
                return cfg.color(i);
            })
            .style('fill', 'none')
            .style('filter', 'url(#glow)');

        //Append the circles
        blobWrapper
            .selectAll('.radarCircle')
            .data(function(d, i) {
                return d;
            })
            .enter()
            .append('circle')
            .attr('class', 'radarCircle')
            .attr('r', cfg.dotRadius)
            .attr('cx', function(d, i) {
                return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
            })
            .attr('cy', function(d, i) {
                return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
            })
            .style('fill', function(d, i, j) {
                return cfg.color(j);
            })
            .style('fill-opacity', 0.8);

        /////////////////////////////////////////////////////////
        //////// Append invisible circles for tooltip ///////////
        /////////////////////////////////////////////////////////

        let newX, newY;

        //Wrapper for the invisible circles on top
        const blobCircleWrapper = g
            .selectAll('.radarCircleWrapper')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'radarCircleWrapper');

        //Append a set of invisible circles on top for the mouseover pop-up
        blobCircleWrapper
            .selectAll('.radarInvisibleCircle')
            .data(function(d, i) {
                return d;
            })
            .enter()
            .append('circle')
            .attr('class', 'radarInvisibleCircle')
            .attr('r', cfg.dotRadius * 1.5)
            .attr('cx', function(d, i) {
                return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
            })
            .attr('cy', function(d, i) {
                return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
            })
            .style('fill', 'none')
            .style('pointer-events', 'all')
            .on('mouseover', function(d, i) {
                newX = parseFloat(d3.select(this).attr('cx')) - 10;
                newY = parseFloat(d3.select(this).attr('cy')) - 10;

                tooltip
                    .attr('x', newX)
                    .attr('y', newY)
                    .text(Format(d.value))
                    .transition()
                    .duration(200)
                    .style('opacity', 1);
            })
            .on('mouseout', function() {
                tooltip.transition().duration(200).style('opacity', 0);
            });

        //Set up the small tooltip for when you hover over a circle
        const tooltip = g.append('text').attr('class', 'tooltip').style('opacity', 0);

        /////////////////////////////////////////////////////////
        /////////////////// Helper Function /////////////////////
        /////////////////////////////////////////////////////////

        //Wraps SVG text
        function wrap(text, width) {
            text.each(function() {
                let text = d3.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4, // ems
                    y = text.attr('y'),
                    x = text.attr('x'),
                    dy = parseFloat(text.attr('dy')),
                    tspan = text
                        .text(null)
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        .attr('dy', dy + 'em');

                while ((word = words.pop())) {
                    line.push(word);
                    tspan.text(line.join(' '));
                    if (tspan.node().getComputedTextLength() > width) {
                        line.pop();
                        tspan.text(line.join(' '));
                        line = [word];
                        tspan = text
                            .append('tspan')
                            .attr('x', x)
                            .attr('y', y)
                            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
                            .text(word);
                    }
                }
            });
        } //wrap
    }

    render() {
        // only start drawing (accessing the DOM) after the first render, once we get hold on the ref of the node
        if (this.rootNode) {
            this.drawSpiderChart('.radarChart', this.props.data, null);
        } else {
            // setTimeout necessary for the very first draw, to ensure drawing using a DOMNode and prevent the following error:
            // "Uncaught TypeError: Cannot read property 'ownerDocument' of null"
            setTimeout(() => this.drawSpiderChart('.radarChart', this.props.data, null), 0);
        }

        return <svg ref={node => this.rootNode = node} />;
    }
}
