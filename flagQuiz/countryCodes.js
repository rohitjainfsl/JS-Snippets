async function fetchData(){
  const response = await fetch('https://flagcdn.com/en/codes.json')
  const codes = await response.json()
  return codes
}

const codesObject = await fetchData()
export default codesObject