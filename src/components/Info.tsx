import { Stats } from '../constants/stats'

const Info = ({ info, addInfo }: any) => {
  const totalStats = info?.stats?.reduce((total: number, item: any) => {
    return total + item.base_stat
  }, 0)

  return (
    <div className='w-100 h-[35%] mt-3 bg-white rounded-xl flex items-center justify-center'>
      <div className='w-[95%] h-[90%] flex'>
        <div className='w-[50%] text-sm'>
          <div className='font-bold'>Base Stats</div>
          <div className='mt-1'>
            <ul>
              {info?.stats?.map((item: any) => (
                <li className={Stats[item.stat?.name]?.color}>
                  {Stats[item.stat?.name]?.name}: {item.base_stat}
                </li>
              ))}
              <li className='bg-slate-200'>Total: {totalStats}</li>
            </ul>
          </div>
        </div>
        <div className='w-[50%] text-sm'>
          <div className='min-h-[50px]'>
            <div className='font-bold'>Abilities</div>
            <ul className='text-xs mt-1'>
              {info?.abilities?.map((item: any) => (
                <li>
                  {item.ability?.name
                    .split('-')
                    .map(
                      (word: any) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(' ')}
                  {item.is_hidden || item.ability?.is_hidden ? ' (hidden)' : ''}
                </li>
              ))}
            </ul>
          </div>
          <div className='flex text-xs mt-2'>
            <div className='flex-1'>
              <div className='font-bold'>Evolves from</div>
              <div className='mt-2'>
                {addInfo?.evolves_from_species?.name.charAt(0).toUpperCase() +
                  addInfo?.evolves_from_species?.name.slice(1) || '-'}
              </div>
            </div>
            <div className='flex-1'>
              <div className='font-bold'>Egg Groups</div>
              <div className='mt-2'>
                <ul>
                  {addInfo?.egg_groups?.length
                    ? addInfo?.egg_groups?.map((item: any) => (
                        <li>
                          {item.name?.charAt(0).toUpperCase() +
                            item.name?.slice(1).replace(/(\d+)/, ' $1')}
                        </li>
                      ))
                    : '-'}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
