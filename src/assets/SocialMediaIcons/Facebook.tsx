import { useWindowSize } from '../../hooks/useWindowsSize'

const Facebook = () => {
  const { width: widthWindow = 0 } = useWindowSize()

  return (
    <svg
      width={widthWindow < 320 ? '16.8' : '18'}
      height={widthWindow < 320 ? '32.2' : '34.5'}
      viewBox="0 0 24 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.3142 24.7296H22.7585L23.9273 17.1211H15.3126V12.9627C15.3126 9.80198 16.3391 6.99924 19.2778 6.99924H24V0.359482C23.1703 0.246763 21.4156 0 18.0999 0C11.1764 0 7.11734 3.6786 7.11734 12.0594V17.1211H0V24.7296H7.11734V45.642C8.52688 45.8553 9.95458 46 11.4201 46C12.7449 46 14.0379 45.8781 15.3142 45.7045V24.7296Z"
        fill="white"
      />
    </svg>
  )
}

export default Facebook
