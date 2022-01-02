import { Button } from '@material-ui/core'
import React from 'react'
import './card.css'
export default function ExpCard({ exp, idx, deletecard, editExp }) {
    return <>
        <div className='expcard'>
            <div className="data">
                <p className='company'>{exp?.company_name}</p>
                <p className='designation'>{exp?.function_name[0]}</p>

                <p className='team'>
                    Team Name :
                    {
                        exp?.team_name.map(t => {
                            return <span className='tag'>{t}</span>
                        })
                    }
                </p>
                <div className='date'>
                    MM/YY :
                    <p className='from'>
                        <span >{exp.from?.month} , </span>
                        <span >{exp.from?.year} </span>
                    </p>
                    -
                    <p className='to'>
                        {exp.ongoing ? <>
                            <span>
                                Present
                            </span>

                        </> :
                            <>
                                <span>
                                    {exp.to?.month} ,
                                    {exp.to?.year}

                                </span>
                            </>

                        }

                    </p>

                </div>
            </div>
            <Button color="secondary" onClick={() => deletecard(idx)}>
                delete
            </Button>


        </div>
    </>
}
