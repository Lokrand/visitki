import React from 'react'
import { Card } from '../../components/Card/Card'
import { students } from '../../utils/students'

export const Gallery = () => {
  return (
    <section>
      {students.map((student) => {
        return (
          <Card name={student.name} city={student.city} img={student.img}/>
        )
      })}
    </section>
  )
}
