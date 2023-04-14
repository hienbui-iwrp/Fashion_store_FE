import React, { useEffect, useMemo, useRef, useState } from 'react'
import { GoodsGenders, GoodsTypes } from '@/constants'
import { Card, Space, DatePicker, Row, Col } from 'antd'
import { LineChart } from '@/components/LineChart'
import { AddButton, DropdownButton, FilterTag } from '@/components'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import styles from '@/styles/Admin.module.css'
import {
  BranchProps,
  GoodsProps,
  ModalAllGoods,
  StatisticData,
  formatBranchDataXML,
  formatStatisticDataXML,
} from '@/utils'
import {
  getBranchBff,
  getProfit1GoodsBFF,
  getProfitBFF,
  getRevenue1GoodsBFF,
  getRevenueBFF,
  getStatisticAllBFF,
} from '@/api'

dayjs.extend(customParseFormat)

const Statistic = () => {
  const curMonth = useMemo(getCurrentDate, [])

  const [startProfit, setStartProfit] = useState<Date>(curMonth.firstDayOfMonth)
  const [endProfit, setEndProfit] = useState<Date>(curMonth.lastDayOfMonth)
  const [profitData, setProfitData] = useState<StatisticData[]>([])
  const [branchProfit, setBranchProfit] = useState<string[]>([])
  const [genderProfit, setGenderProfit] = useState<string[]>([])
  const [typeProfit, setTypeProfit] = useState<string[]>([])
  const [modalAllGoodsProfit, setModalAllGoodsProfit] = useState(false)
  const [goodsProfit, setGoodsProfit] = useState<GoodsProps>()

  const [startRevenue, setStartRevenue] = useState<Date>(
    curMonth.firstDayOfMonth
  )
  const [endRevenue, setEndRevenue] = useState<Date>(curMonth.lastDayOfMonth)
  const [revenueData, setRevenueData] = useState<StatisticData[]>([])
  const [branchRevenue, setBranchRevenue] = useState<string[]>([])
  const [genderRevenue, setGenderRevenue] = useState<string[]>([])
  const [typeRevenue, setTypeRevenue] = useState<string[]>([])
  const [goodsRevenue, setGoodsRevenue] = useState<GoodsProps>()
  const [modalAllGoodsRevenue, setModalAllGoodsRevenue] = useState(false)

  const [allBranch, setAllBranch] = useState<BranchProps[]>([])

  const getProfit1Goods = async () => {
    await getProfit1GoodsBFF({
      goods: goodsProfit?.id ?? '',
      start: startProfit,
      end: endProfit,
    })
      .then((res: any) => {
        const _data = formatStatisticDataXML(res.Data)
        setProfitData(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (goodsProfit) getProfit1Goods()
  }, [goodsProfit, startProfit, endProfit])

  const getProfit = async () => {
    const branchs =
      branchProfit.map((item: string) => {
        return allBranch.find((i: BranchProps) => item == i.name)?.id ?? ''
      }) ?? []
    const genders =
      genderProfit.map((item: string) => {
        return GoodsGenders.find((i: any) => item == i.label)?.value ?? ''
      }) ?? []
    const types =
      typeProfit.map((item: string) => {
        return GoodsTypes.find((i: any) => item == i.label)?.value ?? ''
      }) ?? []
    await getProfitBFF({
      start: startProfit,
      end: endProfit,
      branch: branchs,
      gender: genders,
      type: types,
    })
      .then((res: any) => {
        const _data = formatStatisticDataXML(res.Data)
        setProfitData(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!goodsProfit) getProfit()
  }, [branchProfit, genderProfit, typeProfit, startProfit, endProfit])

  const getRevenue1Goods = async () => {
    await getRevenue1GoodsBFF({
      goods: goodsProfit?.id ?? '',
      start: startProfit,
      end: endProfit,
    })
      .then((res: any) => {
        const _data = formatStatisticDataXML(res.Data)
        setRevenueData(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (goodsRevenue) getRevenue1Goods()
  }, [goodsRevenue, startRevenue, endRevenue])

  const getRevenue = async () => {
    const branchs =
      branchRevenue.map((item: string) => {
        return allBranch.find((i: BranchProps) => item == i.name)?.id ?? ''
      }) ?? []
    const genders =
      genderRevenue.map((item: string) => {
        return GoodsGenders.find((i: any) => item == i.label)?.value ?? ''
      }) ?? []
    const types =
      typeRevenue.map((item: string) => {
        return GoodsTypes.find((i: any) => item == i.label)?.value ?? ''
      }) ?? []
    await getRevenueBFF({
      start: startRevenue,
      end: endRevenue,
      branch: branchs,
      gender: genders,
      type: types,
    })
      .then((res: any) => {
        const _data = formatStatisticDataXML(res.Data)
        setRevenueData(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    if (!goodsRevenue) getRevenue()
  }, [branchRevenue, genderRevenue, typeRevenue, startRevenue, endRevenue])

  const getOverallData = async () => {
    await getStatisticAllBFF({
      start: curMonth.firstDayOfMonth,
      end: curMonth.lastDayOfMonth,
    })
      .then((res: any) => {
        const _data = formatStatisticDataXML(res.Data)
        setRevenueData(_data)
        setProfitData(_data)
        console.log(_data)
      })
      .catch((err) => {
        console.log(err)
      })
    await getBranchBff()
      .then((res: any) => {
        if (res.StatusCode != 200) throw new Error('FAIL')
        const _data = res.Data.map((item: any) => {
          return formatBranchDataXML(item)
        })
        setAllBranch(_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getOverallData()
  }, [])

  return (
    <>
      <Space direction='vertical' style={{ width: '99%' }} size='large'>
        <Card className='!max-w-full-lg'>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col xs={24} sm={24} lg={10} className='my-2'>
              <Space direction='horizontal' size={15}>
                <DropdownButton
                  label={'Chi nhánh'}
                  items={allBranch?.map((item: BranchProps) => item.name ?? '')}
                  callback={(text) => {
                    setGoodsProfit(undefined)

                    if (!branchProfit.includes(text))
                      setBranchProfit([...branchProfit, text])
                  }}
                />
                <DropdownButton
                  label={'Giới tính'}
                  items={GoodsGenders?.map((item: any) => item.label ?? '')}
                  callback={(text) => {
                    setGoodsProfit(undefined)

                    if (!genderProfit.includes(text))
                      setGenderProfit([...genderProfit, text])
                  }}
                />
                <DropdownButton
                  label={'Loại'}
                  items={GoodsTypes?.map((item: any) => item.label ?? '')}
                  callback={(text) => {
                    setGoodsProfit(undefined)

                    if (!typeProfit.includes(text))
                      setTypeProfit([...typeProfit, text])
                  }}
                />
              </Space>
            </Col>
            <Col xs={24} sm={16} lg={8} className='my-2'>
              <Space direction='horizontal' size={15}>
                <DatePicker
                  placeholder='Start Date'
                  format={'DD/MM/YYYY'}
                  defaultValue={dayjs(startProfit)}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    if (date) setStartProfit(date?.toDate())
                    else setStartProfit(new Date('01-01-1990'))
                  }}
                />
                <DatePicker
                  placeholder='End Date'
                  defaultValue={dayjs(endProfit)}
                  format={'DD/MM/YYYY'}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    if (date) setEndProfit(date?.toDate())
                    else setEndProfit(new Date('01-01-9990'))
                  }}
                />
              </Space>
            </Col>
            <Col xs={24} sm={8} lg={4} className='my-2'>
              <AddButton
                label='Chọn sản phẩm'
                onClick={() => setModalAllGoodsProfit(true)}
              />
            </Col>
          </Row>
          <Space size={4}>
            {branchProfit.map((item) => {
              return (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _branchProfit = [...branchProfit]
                    var index = _branchProfit.indexOf(item)
                    if (index > -1) {
                      _branchProfit.splice(index, 1)
                      setBranchProfit(_branchProfit)
                    }
                  }}
                />
              )
            })}
            {genderProfit.map((item) => {
              return (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _genderProfit = [...genderProfit]
                    var index = _genderProfit.indexOf(item)
                    if (index > -1) {
                      _genderProfit.splice(index, 1)
                      setGenderProfit(_genderProfit)
                    }
                  }}
                />
              )
            })}
            {typeProfit.map((item) => {
              return (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _typeProfit = [...typeProfit]
                    var index = _typeProfit.indexOf(item)
                    if (index > -1) {
                      _typeProfit.splice(index, 1)
                      setTypeProfit(_typeProfit)
                    }
                  }}
                />
              )
            })}
            {goodsProfit && (
              <FilterTag
                key={goodsProfit.name}
                label={goodsProfit.name}
                onClick={() => {
                  setGoodsProfit(undefined)
                  getProfit()
                }}
              />
            )}
          </Space>

          <LineChart data={profitData} profit showTotal />
        </Card>
        <Card className='!max-w-full-lg'>
          <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Col xs={24} lg={24} xl={10} className='my-2'>
              <Space direction='horizontal' size={25}>
                <DropdownButton
                  label={'Chi nhánh'}
                  items={allBranch?.map((item: BranchProps) => item.name ?? '')}
                  callback={(text) => {
                    setGoodsRevenue(undefined)

                    if (!branchRevenue.includes(text))
                      setBranchRevenue([...branchRevenue, text])
                  }}
                />
                <DropdownButton
                  label={'Giới tính'}
                  items={GoodsGenders?.map((item: any) => item.label ?? '')}
                  callback={(text) => {
                    setGoodsRevenue(undefined)

                    if (!genderRevenue.includes(text))
                      setGenderRevenue([...genderRevenue, text])
                  }}
                />
                <DropdownButton
                  label={'Loại'}
                  items={GoodsTypes?.map((item: any) => item.label ?? '')}
                  callback={(text) => {
                    setGoodsRevenue(undefined)

                    if (!typeRevenue.includes(text))
                      setTypeRevenue([...typeRevenue, text])
                  }}
                />
              </Space>
            </Col>
            <Col xs={24} lg={16} xl={8} className='my-2'>
              <Space direction='horizontal' size={25}>
                <DatePicker
                  placeholder='Start Date'
                  format={'DD/MM/YYYY'}
                  defaultValue={dayjs(startRevenue)}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    if (date) setStartRevenue(date?.toDate())
                    else setStartRevenue(new Date('01-01-1990'))
                  }}
                />
                <DatePicker
                  placeholder='End Date'
                  defaultValue={dayjs(endRevenue)}
                  format={'DD/MM/YYYY'}
                  className={styles.adminInputShadow}
                  onChange={(date, dateString) => {
                    if (date) setEndRevenue(date?.toDate())
                    else setEndRevenue(new Date('01-01-9990'))
                  }}
                />
              </Space>
            </Col>
            <Col xs={24} lg={8} xl={4} className='my-2'>
              <AddButton
                label='Chọn sản phẩm'
                onClick={() => setModalAllGoodsRevenue(true)}
              />
            </Col>
          </Row>
          <Space size={4}>
            {branchRevenue.map((item) => {
              return (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _branchRevenue = [...branchRevenue]
                    var index = _branchRevenue.indexOf(item)
                    if (index > -1) {
                      _branchRevenue.splice(index, 1)
                      setBranchRevenue(_branchRevenue)
                    }
                  }}
                />
              )
            })}
            {genderRevenue.map((item) => {
              return (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _genderRevenue = [...genderRevenue]
                    var index = _genderRevenue.indexOf(item)
                    if (index > -1) {
                      _genderRevenue.splice(index, 1)
                      setGenderRevenue(_genderRevenue)
                    }
                  }}
                />
              )
            })}
            {typeRevenue.map((item) => {
              return (
                <FilterTag
                  key={item}
                  label={item}
                  onClick={() => {
                    let _typeRevenue = [...typeRevenue]
                    var index = _typeRevenue.indexOf(item)
                    if (index > -1) {
                      _typeRevenue.splice(index, 1)
                      setTypeRevenue(_typeRevenue)
                    }
                  }}
                />
              )
            })}
            {goodsRevenue && (
              <FilterTag
                key={goodsRevenue.name}
                label={goodsRevenue.name}
                onClick={() => {
                  setGoodsRevenue(undefined)
                  getRevenue()
                }}
              />
            )}
          </Space>
          <LineChart data={revenueData} revenue showTotal />
        </Card>
      </Space>
      {modalAllGoodsProfit && (
        <ModalAllGoods
          open={modalAllGoodsProfit}
          cancel={() => setModalAllGoodsProfit(false)}
          single={true}
          callback={async (item) => {
            if (item) {
              setGoodsProfit(item)
              setGenderProfit([])
              setTypeProfit([])
              setBranchProfit([])
              setModalAllGoodsProfit(false)
            }
          }}
        />
      )}
      {modalAllGoodsRevenue && (
        <ModalAllGoods
          open={modalAllGoodsRevenue}
          cancel={() => setModalAllGoodsRevenue(false)}
          single={true}
          callback={async (item) => {
            if (item) {
              setGoodsRevenue(item)
              setGenderRevenue([])
              setTypeRevenue([])
              setBranchRevenue([])
              setModalAllGoodsRevenue(false)
            }
          }}
        />
      )}
    </>
  )
}

const getCurrentDate = () => {
  const currentDate = new Date()

  const currentMonth = currentDate.getMonth()

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentMonth, 1)

  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentMonth + 1,
    0
  )

  return { firstDayOfMonth, lastDayOfMonth }
}

Statistic.displayName = 'Statistic Management'

export default Statistic
