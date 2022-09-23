import React from 'react'
import Odometer from 'react-odometerjs';

const Numbers = () => {
  return (
    <div>
          <Odometer animation='count' value={1234} />
    </div>
  )
}

export default Numbers