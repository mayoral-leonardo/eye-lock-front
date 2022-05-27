import React, { useState } from "react";
import './SystemFunctions.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import { DownOutlined, UpOutlined, StopOutlined, MinusOutlined } from "@ant-design/icons";

export default function SystemFunctions() {
  const [temperature, setTemperature] = useState(22);
  const [isOn, setIsOn] = useState(false)

  return (
    <section className='system-functions'>
      <Sidebar />
      <div className='system-functions__main-content'>
        <div className='system-functions__cards'>
          <div className='system-functions__cards__item'>
            <div className='system-functions__cards__item__header'>
              <span>Ar Condicionado</span>
            </div>
            <div className='system-functions__cards__item__number'>
              <span>{isOn ? temperature + 'º' : <MinusOutlined />}</span>
            </div>
            <div className='system-functions__cards__item__title'>
              <div className='system-functions__cards__item__title__buttons'>
                <span onClick={() => {
                  setIsOn(prev => !prev)
                  setTemperature(22)
                }}>{isOn ? 'Desligar' : 'Ligar'}</span>
                <div>
                  {temperature > 18 && isOn
                    ? <DownOutlined className='button' onClick={() => setTemperature(temperature - 1)} />
                    : <StopOutlined className='button' />
                  }
                  {temperature < 26 && isOn
                    ? <UpOutlined className='button' onClick={() => setTemperature(temperature + 1)} />
                    : <StopOutlined className='button' />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className='system-functions__cards__item'>
            <div className='system-functions__cards__item__header'>
              <span>Ar Condicionado</span>
            </div>
            <div className='system-functions__cards__item__number'>
              <span>{temperature}</span>
            </div>
            <div className='system-functions__cards__item__title'>
              <span>Ligar</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}