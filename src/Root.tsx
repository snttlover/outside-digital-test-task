import React, { useState } from 'react';
import { Brand } from './redux/reducers/brandsReducer';
import './App.css';

type Props = {
    title: string,
    elements: Brand[],
    search: boolean
}
const Root: React.FC<Props> = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    let mainTrue: Array<Brand> = []
    let mainFalse: Array<Brand> = []

    return (
        <div onClick={() => setIsOpen((prev) => !prev)}>
            <div>{props.title} <span>{isOpen ? '-' : '+'}</span></div>
            <div className='tree-body'>
                {props.elements.map((item, index) => {
                    if (isOpen || props.search) {
                        return <div key={item._id}>
                            <span>{item.title}</span><span>(main:{'' + item.main})</span>
                        </div>
                    } else {
                        if (item.main) {
                            mainTrue.push(item)

                        } else mainFalse.push(item)
                    }
                })}
                {mainTrue.length > 0 ? mainTrue.map((item, index) => {
                    if (index < 5) {
                        return <div key={item._id}>
                            <span>{item.title}</span><span>(main:{'' + item.main})</span>
                        </div>
                    }
                }) : mainFalse.map((item, index) => {
                    if (index < 5) {
                        return <div key={item._id}>
                            <span>{item.title}</span><span>(main:{'' + item.main})</span>
                        </div>
                    }
                })}
            </div>
        </div>
    )
}

export default Root