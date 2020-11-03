## “TaskManager”

Спецификация проекта


## Цель
Создать проект, выполняющий функцию менеджера задач.

## Описание
Таск менеджер — программа, которая упрощает рабочий процесс и управление проектами. 
Он позволяет разработчикам вести учет задач проекта, планировать и отслеживать процесс выполнения.


## Функциональные возможности:


1. Учет проектов

		I Создание новых проектов

		II Редактирование проектов

		III Удаление проектов
 

2. Учет задач для каждого проекта

		I Создание задач

		II Редактирование задач

		III Удаление задач


3. Учет сотрудников

		I Добавление сотрудника и его профиля

		II Удаление сотрудника

		III Редактирование данных сотрудника

		IV Назначение сотрудников в проект

		V Удаление сотрудников из проекта

		VI Назначение задач сотрудникам
 

4. Логика состояний задач

		I Изменение состояния задачи при выполнении условий

		II Фильтрация задач по состоянию
 
		III Фильтрация задач по сотруднику или проекту
		
		IV Учет планового и фактического времени на выполнение

## Используемые технологии

| Технология    | Версия    |
| ------------- |:---------:|
| Go            | 1.15.2    |
| Revel         | 1.0.0     |
| PostgreSQL    | 11.8      |
| Webix         | 7.4.0     |
