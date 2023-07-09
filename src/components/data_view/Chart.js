import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const drawChart = () => {
      // Clear any existing chart
      d3.select(chartRef.current).selectAll('*').remove();

      // Check if the chart container is available
      if (!chartRef.current) return;

      // Get the size of the container element
      const containerWidth = chartRef.current.clientWidth;
      const containerHeight = chartRef.current.clientHeight;

      // Set up the chart margins
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = containerWidth - margin.left - margin.right;
      const height = containerHeight - margin.top - margin.bottom;

      // Count the number of tasks for each status
      const statusCounts = data.reduce((counts, task) => {
        const status = task.status.toLowerCase();
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      }, {});

      // Convert the counts object to an array of objects
      const chartData = Object.keys(statusCounts).map((status) => ({
        status,
        count: statusCounts[status],
      }));

      // Create scales for x and y axes
      const xScale = d3
        .scaleBand()
        .domain(chartData.map((d) => d.status))
        .range([0, width])
        .padding(0.1);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(chartData, (d) => d.count)])
        .range([height, 0]);

      // Create axes
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // Create the SVG element
      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', containerWidth)
        .attr('height', containerHeight)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Append the axes to the SVG
      svg
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      svg.append('g').call(yAxis);

      // Create bars
      svg
        .selectAll('rect')
        .data(chartData)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.status))
        .attr('y', (d) => yScale(d.count))
        .attr('width', xScale.bandwidth())
        .attr('height', (d) => height - yScale(d.count))
        .attr('fill', 'steelblue');
    };

    // Call the drawChart function initially and on window resize
    drawChart();
    window.addEventListener('resize', drawChart);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', drawChart);
    };
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};

export default Chart;
