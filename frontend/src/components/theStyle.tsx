import "../style.css"
import type { ReactNode } from 'react';

function TheStyle({children}:{children : ReactNode}) {
  return (
    <section>
        <div className="moon"/>
        <div className="crow"/>
        <div className="crow1"/>
        <div className="crow2"/>
        <div className="crow3"/>
        <div className="crow4"/>
        <div className="crow5"/>
        {children}
    </section>
  )
}

export default TheStyle