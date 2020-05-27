import React from 'react'

function LoadingIcon() {
    const animateXTravel = 10
    const animateYTravel = 10
    const radius = 50
    const top = [radius + animateXTravel, animateYTravel]

    return (
        <svg>
            {/*<rect width={2 * (radius + animateXTravel)} height={2 * (radius + animateYTravel)}/>*/}
            <path fill="#d77a61ff"
                  d={`M ${top[0]},${top[1]}
                     a ${radius},${radius}, 0,0,0 ${-radius},${radius}
                     a ${radius},${radius}, 0,0,0 ${radius},${radius}
                     a ${radius},${radius}, 0,0,0 ${radius},${-radius}
                     l ${-radius},0
                     l 0, ${-radius}
                     `}
            />
            <path fill="#d8b4a0ff"
                  d={`M${top[0]},${top[1]}
                      a ${radius},${radius}, 0,0,1 ${radius},${radius}
                      l ${-radius},0
                      l 0,${-radius}
                      `}
            >
                <animateMotion dur="2s" repeatCount="indefinite"
                               path={`M 0,0
                                      l ${animateXTravel},${-animateYTravel}
                                      l ${-animateXTravel},${animateYTravel}
                                   `}
                />
            </path>
        </svg>
    )
}

export default LoadingIcon