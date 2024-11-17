import React, { ReactNode } from 'react'

type TransparentBackgroundProps = {
  children: ReactNode
}

const TransparentBackground: React.FC<TransparentBackgroundProps> = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: '80px', // Espaço para o Header
      bottom: '170px', // Espaço para o Footer
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '15px',
      zIndex: 10,
      margin: '0 20px', // Margem lateral para evitar que encoste nas bordas
    }}
  >
    {children}
  </div>
)

export default TransparentBackground
