import classNames from "classnames";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";
import { StatusMenu } from "../interfaces/StatusMenu";

export function Sidebar(props: StatusMenu) {
    const { data } = useGetLessonsQuery();

    return (
        <aside className={classNames("sm:w-[348px] bg-gray-700 p-6 border-l border-gray-600 sm:block", {
            'block': props.isMenuOpen,
            'hidden': !props.isMenuOpen
        })}>
            <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
                Cronograma de aulas
            </span>

            <div className="flex flex-col gap-8">
                {data?.lessons.map(lesson => {
                    return (
                        <Lesson
                            key={lesson.id}
                            title={lesson.title}
                            slug={lesson.slug}
                            availableAt={new Date(lesson.availableAt)}
                            type={lesson.lessonType}
                            isMenuOpen={props.isMenuOpen} 
                            setStatusMenu={props.setStatusMenu}
                        />
                    )
                })}
            </div>
        </aside>       
    )
}