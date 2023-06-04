import React, { useState, useRef } from 'react'
import { ReactReader } from 'react-reader'
import ePub from 'epubjs/lib/index'

const Reader = () => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const renditionRef = useRef(null)
  const locationChanged = epubcifi => {
    const rendition = renditionRef.current;
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
    const [a, b] = [rendition.currentLocation().start.cfi, rendition.currentLocation().end.cfi]
    // rendition.getRange(makeRangeCfi(a, b)).then(range => {
    //     console.log(range.toString())
    // })
    // console.log(rendition.currentLocation().start.cfi)
    console.log(rendition.getRange(makeRangeCfi(a, b)).toString());
  }
  
  const makeRangeCfi = (a, b) => {
    const CFI = new ePub.CFI()
    const start = CFI.parse(a), end = CFI.parse(b)
    const cfi = {
        range: true,
        base: start.base,
        path: {
            steps: [],
            terminal: null
        },
        start: start.path,
        end: end.path
    }
    const len = cfi.start.steps.length
    for (let i = 0; i < len; i++) {
        if (CFI.equalStep(cfi.start.steps[i], cfi.end.steps[i])) {
            if (i == len - 1) {
                // Last step is equal, check terminals
                if (cfi.start.terminal === cfi.end.terminal) {
                    // CFI's are equal
                    cfi.path.steps.push(cfi.start.steps[i])
                    // Not a range
                    cfi.range = false
                }
            } else cfi.path.steps.push(cfi.start.steps[i])
        } else break
    }
    cfi.start.steps = cfi.start.steps.slice(cfi.path.steps.length)
    cfi.end.steps = cfi.end.steps.slice(cfi.path.steps.length)

    return 'epubcfi(' + CFI.segmentString(cfi.base)
        + '!' + CFI.segmentString(cfi.path)
        + ',' + CFI.segmentString(cfi.start)
        + ',' + CFI.segmentString(cfi.end)
        + ')'
}

  return (
    <div className="reader-panel">
      <ReactReader
        location={location}
        locationChanged={locationChanged}
        url="https://philclaude.s3.us-west-2.amazonaws.com/Euthopro.epub"
        getRendition={rendition => {
          renditionRef.current = rendition
          rendition.themes.register('custom', {
            // "*": {
            //     color: "#FFFFFF",
            //     backgroundColor: "#252525",
            //   },
  
              img: {
                border: '1px solid red'
              },
              p: {
                'line-height': '1.35',
                'margin' : '15px 0',
                'font-family': 'Vollkorn, sans-serif',
                'font-weight': '300',
                'font-size': '20px',
                // border: '1px solid green'
              }
          })

          rendition.themes.select('custom')
          // renditionRef.current.themes.fontSize(`${size}%`)
        }}
      />
    </div>
  )
}

export default Reader