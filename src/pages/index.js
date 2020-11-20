import Head from 'next/head'
import { useState } from 'react'
import CountriesTable from '../components/CountriesTable/CountriesTable'
import Layout from '../components/Layout/Layout'
import SearchInput from '../components/SearchInput/SearchInput'
import styles from '../styles/Home.module.css'


function Home({countries}) {
  const [keyword, setKeyword] = useState("")

  const filteredCountries = countries.filter(
    (country) => country.name.toLowerCase().includes(keyword) ||
                  country.region.toLowerCase().includes(keyword) ||
                  country.subregion.toLowerCase().includes(keyword)
    )

  const inputChange = (event) => {
    event.preventDefault()
    setKeyword(event.target.value.toLowerCase())
  }

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {countries.length} countries</div>
        <SearchInput type="text" placeholder="Filter by Name, Region, Sub-Region" onChange={inputChange} />
      </div>

      <CountriesTable countries={filteredCountries} />
    </Layout>
  )
}

export const getStaticProps = async() =>{
  const res = await fetch(`https://restcountries.eu/rest/v2/all`,{method:"GET"})
  const countries = await res.json()

  return {
    props: {
      countries,
    }
  }
}

export default Home