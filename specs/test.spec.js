describe('TEST DESCRIBE', () => {

  beforeEach(async () => {
    await browser.get('/')
  })

  it('TEST IT', async () => {

    const userName = 'Pavel'
    const userPassword = '12345'
    const tableHeadElements = $$('#app > div > div > div:nth-child(2) > table:nth-child(8) > thead > tr > td')
    const tableRowsElements = $$('.text-center > tbody > tr')

    await $$('.form-control').get(0).sendKeys(userName)
    await $$('.form-control').get(1).sendKeys(userPassword)
    await $('.btn-primary').click()

    async function getTableData() {
      const rowsCount = await tableRowsElements.count()
      const rowsList = []

      const tableHeaderList = await tableHeadElements.reduce(async function(acc, elem) {
        const headerText = await elem.getText()
        acc.push(headerText)
        return acc
      }, [])

      for (let i = 0; i < rowsCount; i++) {
        const rowData = await tableRowsElements.get(i).$$('td').reduce(async function(acc, elem) {
          const columnData = await elem.getText()
          acc.push(columnData)
          return acc
        }, [])
        rowsList.push(rowData)
      }

      const result = rowsList.reduce(function(acc, row) {
        const data = row.reduce(function(acc, elem, index) {
          acc[tableHeaderList[index]] = elem
          return acc
        }, {})
        acc.push(data) 
        return acc
      }, [])

      console.log(result)
    }

    await getTableData()
  })

})