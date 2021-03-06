import { CheckCircle, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { StatusMenu } from "../interfaces/StatusMenu";

interface LessonProps extends StatusMenu {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
    const { slug } = useParams<{ slug: string }>()

    const isLessonAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR,
    });
    const isActiveLeesson = (slug == props.slug);

    return (
        <Link 
            to={isLessonAvailable ? `/event/lesson/${props.slug}` : ''}
            className={classNames('group', {'cursor-default': !isLessonAvailable})}
            onClick={() => isLessonAvailable && props.setStatusMenu(false)}
        >
            <span className="text-gray-300">
                {availableDateFormatted}
            </span>

            <div className={classNames('relative rounded border border-gray-500 p-4 mt-2', {
                'group-hover:border-green-500': isLessonAvailable && !isActiveLeesson,
                'bg-green-500': isActiveLeesson
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailable ? (
                        <span className={classNames('text-sm font-medium flex items-center gap-2', {
                            'text-white': isActiveLeesson,
                            'text-blue-500': !isActiveLeesson,
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span>
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className={classNames('text-xs rounded px-2 py-[0.125rem] text-white border font-bold', {
                        'border-white': isActiveLeesson,
                        'border-green-300': !isActiveLeesson,
                        'border-orange-500': !isLessonAvailable
                    })}>
                        {props.type == 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
                    </span>
                </header>

                <strong className={classNames('mt-5 block', {
                    'text-white': isActiveLeesson,
                    'text-gray-200': !isActiveLeesson,
                })}>
                    {props.title}
                </strong>
                {isActiveLeesson && (
                    <div className='rounded-sm bg-green-500 w-3 h-3 rotate-45 absolute top-0 bottom-0 left-[-6px] my-auto' />
                )}
            </div>
        </Link>
    )
}