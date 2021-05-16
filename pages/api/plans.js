const data = [
  {
    provider: 'FWD',
    verticals: [
      {key: 'corona-virus-insurance', coverage: '12 months', price: '$ 1,200'},
      {key: 'car-insurance', coverage: '15 months', price: '$ 1,100'},
      {key: 'motorcycle-ctpl-insurance', coverage: '12 months', price: '$ 1,050'},
    ]
  },
  {
    provider: 'AXA',
    verticals: [
      {key: 'corona-virus-insurance', coverage: '13 months', price: '$ 1,250'},
      {key: 'car-insurance', coverage: '15 months', price: '$ 1,110'},
      {key: 'motorcycle-ctpl-insurance', coverage: '18 months', price: '$ 1,150'},
    ]
  },
  {
    provider: 'VFS',
    verticals: [
      {key: 'corona-virus-insurance', coverage: '10 months', price: '$ 1,600'},
      {key: 'car-insurance', coverage: '12 months', price: '$ 1,020'},
      {key: 'motorcycle-ctpl-insurance', coverage: '10 months', price: '$ 1,450'},
    ]
  }
];

export default (req, res) => {
  res.status(200).json({ data })
}
