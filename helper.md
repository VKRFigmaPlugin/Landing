# Руководство по компонентам во Flask (Jinja)

---

## Структура проекта

Вся HTML-логика хранится в `templates/`.

```
templates/
├── layouts/
│   └── base.html
├── pages/
│   ├── index.html
│   └── document.html
├── components/
│   ├── elements/
│   │   ├── header.html
│   │   └── footer.html
│   └── parts/
│       ├── index/
│       │   ├── hero.html
│       │   └── faq.html
│       └── document/
│           └── content.html
```

---

## base.html — базовый шаблон

`templates/layouts/base.html`  
Используется на всех страницах и содержит общий каркас сайта.

---

## Страницы (pages)

Страницы не содержат HTML-разметку напрямую, а только собирают компоненты.

`templates/pages/index.html`

```jinja
{% extends "layouts/base.html" %}

{% block title %}Главная{% endblock %}

{% block body %}
  {% include "components/parts/index/hero.html" %}
  {% include "components/parts/index/faq.html" %}
{% endblock %}
```

---

## Компоненты (components/parts)

Компоненты — это изолированные части интерфейса.

`templates/components/parts/index/hero.html`

```jinja
<section class="hero">
  <h1>Hero block</h1>
  <p>Lol, kek</p>
</section>
```

---

## Стили компонентов

Каждый HTML-компонент **обязан иметь свой файл стилей**.

Структура стилей должна повторять структуру компонентов.

```
static/
└── styles/
    ├── styles.scss
    └── components/
        ├── index/
        │   ├── hero.scss
        │   └── faq.scss
        └── document/
            └── content.scss
```

---

### Пример: компонент `hero`

HTML-компонент:

```
templates/components/parts/index/hero.html
```

SCSS-файл компонента:

```
static/styles/components/index/hero.scss
```

---

## Главный файл стилей

Все стили компонентов подключаются вручную в главном файле.

```
static/styles/styles.scss
```

```scss
/* Index page */
@import "components/index/hero";
@import "components/index/faq";

/* Document page */
@import "components/document/content";
```

---

## Правила для стилей

- один компонент → один `.scss` файл
- структура `styles/components` повторяет `components/parts`
- стили компонента описываются только в его файле

---

## Основные правила

- layouts — только каркас
- pages — только сборка
- components — вся HTML-логика

---

## Итоговая логика

1. Flask рендерит страницу из pages
2. Страница расширяет base.html
3. Контент собирается из компонентов
4. Компоненты получают данные от Flask или локально
