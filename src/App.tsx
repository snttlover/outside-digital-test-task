import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { getBrands } from './redux/reducers/brandsReducer'
import { connect } from 'react-redux';
import { Brand } from './redux/reducers/brandsReducer'
import { BrandState } from './redux/reducers/brandsReducer'
import Root from './Root';

type Props = {
  elements: Brand[],
  getBrands: () => void
}
type State = {
  brands: BrandState
}


export type Section = {
  title: string,
  elements: Array<Brand>
}
interface TreeView {
  [key: string]: Section
}
let sort = (a: Brand | Section, b: Brand | Section, order: string) => {
  if (order === 'straight') {
    if (Number(a.title[0]) > Number(b.title[0])) return 1
    if (Number(a.title[0]) < Number(b.title[0])) return -1
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
    return 0
  }
  else {
    if (Number(a.title[0]) > Number(b.title[0])) return 1
    if (Number(a.title[0]) < Number(b.title[0])) return -1
    if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
    if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
    return 0

  }
}

const App: React.FC<Props> = (props: Props) => {
  const [input, setInput] = useState('')
  const [reg, setReg] = useState(true)
  const [order, setOrder] = useState('straight')
  useEffect(() => {
    props.getBrands()

  }, []);
  let onChangeOrder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(e.target.value)

  }
  let changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)

  }

  let sorted = [...props.elements].sort((a, b) => {
    return sort(a, b, order)
  })
  let divided: TreeView = {}
  sorted.map(function (item, index, arr) {
    if ((!reg&&item.title.toLowerCase().includes(input.toLowerCase()))||(reg&&item.title.includes(input)) || !input) {
      if (item.title[0].toUpperCase() in divided) {
        return order === 'straight' ? divided[item.title[0].toUpperCase()].elements.push(item) : divided[item.title[0].toUpperCase()].elements.unshift(item)
      } else {
        return divided[item.title[0].toUpperCase()] = {
          title: item.title[0].toUpperCase(),
          elements: [
            item
          ]
        }
      }
    }

  })
  let dividedSorted: Array<Section> = []
  Object.keys(divided).sort((a: string, b: string) => {
    return sort(divided[a], divided[b], order)
  })
    .reduce((obj: any, key: string) => {
      obj[key] = divided[key];
      dividedSorted.push(divided[key])
      return obj;
    },
      {}
    );
  dividedSorted.forEach((item: Section) => {
    item.elements.sort((a: Brand, b: Brand) => {
      return sort(a, b, order)
    })
  })




  return (
    <div className="App">
      <div className="App-header">
        <div >
          <input type="radio" value="straight" onChange={onChangeOrder} checked={order === 'straight' ? true : false} name="order" /> (A-Z)
          <input type="radio" value="inverse" onChange={onChangeOrder} checked={order === 'inverse' ? true : false} name="order" /> (Z-A)

        </div>
        <input type="text" value={input} onChange={changeInput} />
        <div className='reg'>

          <button onClick={() => setReg((prev) => !prev)} className={reg ? 'on-reg' : ''}>Aa</button>
          <span>поиск с учетом регистра {reg ? 'включен' : 'выключен'}</span>
        </div>
        <div className='list'>
          {dividedSorted.map((item: Section) => {
            return <Root search={!!input} key={item.title} title={item.title} elements={item.elements} />
          })}
        </div>
      </div>
    </div>
  );
}
let mapStateToProps = (state: State) => {
  return {
    elements: state.brands.elements
  }
}

export default connect(mapStateToProps, { getBrands })(App)
