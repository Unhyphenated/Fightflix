import React from "react";
import { isEmpty } from 'lodash';

interface FightListProps {
    data: Record<string, any>[],
    title: string
}
const FightList: React.FC<FightListProps> = ({ data, title }) => {
    if (isEmpty(data)) return null;

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {data.map((fight) => (
                        <FightCard key={fight.id} data={fight}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FightList;