import { Query } from "@/types/query.type";
import { DEFAULT_QUERY_LIMIT } from "./constant";

export const getRandomAvatarColor = (fallback: string) => {
  const colors = [
    "bg-red-500",
    "bg-orange-300",
    "bg-yellow-500",
    "bg-green-300",
    "bg-teal-400",
    "bg-sky-300",
    "bg-purple-300",
    "bg-pink-300",
  ];
  const strHashedAsNumber = (fallback || "")
    .split("")
    .reduce((acc, val) => val.charCodeAt(0) + acc, fallback?.length || 0);

  return colors[strHashedAsNumber % colors.length];
};

export const getAvatarLetters = (name: string): string => {
  const words = name.split(" ");

  if (words.length === 0 || words.length === 1) {
    return "";
  }

  const firstLetter = words[0][0];
  const lastLetter = words[1][0];

  return firstLetter + lastLetter;
};

export const getNewMockId = (): number =>
  Math.floor(Math.random() * (1000 - 7 + 1)) + 7;

export const getFormattedQuery = (query?: Query) =>
  query
    ? `?limit=${query.limit ? query.limit : DEFAULT_QUERY_LIMIT}&page=${
        query.page ? query.page : 1
      }`
    : `?limit=${DEFAULT_QUERY_LIMIT}&page=1`;

export const transformDateFormat = (dateString: string): string => {
  const [year, month, day] = dateString.split("-");
  return `${day}.${month}.${year}`;
};

export const saveRaskItem = (name: string, string: string) => {
  localStorage.setItem(`rask-${name}`, string);
};

export const getRaskItem = (name: string): string => {
  const path = localStorage.getItem(`rask-${name}`) ?? "";
  return path;
};

export const dropRaskItem = (name: string): void => {
  localStorage.removeItem(`rask-${name}`);
};

export const getPageNumbers = (totalPages: number, currentPage: number) => {
  const pages: number[] = [];

  if (totalPages <= 0) {
    return pages;
  }

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage === 1) {
      pages.push(1, 2, 3);
    } else if (currentPage === totalPages) {
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(currentPage - 1, currentPage, currentPage + 1);
    }
  }

  return pages;
};

type CalculateCardsParams = {
  containerWidth: number; // Ширина контейнера (в пикселях)
  cardWidth: number; // Ширина одной карточки (в пикселях)
  cardGap: number; // Промежуток между карточками (в пикселях)
  containerHeight: number; // Высота контейнера (в пикселях)
  cardHeight: number; // Высота одной карточки (в пикселях)
};

export function calculateCardsPerPage(params: CalculateCardsParams): number {
  const { containerWidth, cardWidth, cardGap, containerHeight, cardHeight } =
    params;

  // Считаем количество карточек, которое помещается по горизонтали
  const cardsInRow = Math.max(
    1,
    Math.floor((containerWidth + cardGap) / (cardWidth + cardGap)) // Учитываем cardGap между карточками
  );

  // Считаем количество строк, которое помещается по высоте
  const rowsInContainer = Math.max(
    1,
    Math.floor((containerHeight + cardGap) / (cardHeight + cardGap)) // Учитываем cardGap между строками
  );

  // Общее количество карточек
  const totalCards = cardsInRow * rowsInContainer;

  return totalCards; // Возвращаем результат
}
