import {
  createContext,
  useReducer,
  useEffect,
  useContext,
  useState,
} from "react";
import { Color } from "../utils/theme";
import { Data } from "../data";

const DetailsContext = createContext(null);
const DetailsDispatchcontext = createContext(null);
const TagContext = createContext(null);

const colors = [
  Color.red,
  Color.orange,
  Color.yellow,
  Color.blue,
  Color.pink,
  Color.purple,
];

const initialDetails = JSON.parse(localStorage.getItem("details")) || Data;
const initialTag = getTags({ data: initialDetails });
let item_id = initialDetails[initialDetails.length - 1].id + 1;

function getTags({ data }) {
  const categorySet = new Map();

  // 遍历 Details 数据以提取类别
  data.forEach((item) => {
    if (!categorySet.has(item.category)) {
      // 如果该类别尚不存在，则添加到集合中
      const id = categorySet.size.toString(); // 使用集合的大小作为 ID
      categorySet.set(item.category, {
        id: id,
        name: item.category,
        color: colors[id % colors.length], // 获取颜色，如果没有则使用默认黑色
        isExpense: item.isExpense,
      });
    }
  });
  return Array.from(categorySet.values());
}

function DetailsProvider({ children }) {
  const [details, dispatch] = useReducer(detailsReducer, initialDetails);

  const [Tags, setTags] = useState(initialTag);
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(details));
    const newTags = getTags({ data: details });
    setTags(newTags);
    localStorage.setItem("tags", JSON.stringify(newTags));
  }, [details]);

  return (
    <DetailsContext.Provider value={details}>
      <DetailsDispatchcontext.Provider value={dispatch}>
        <TagContext.Provider value={Tags}>{children}</TagContext.Provider>
      </DetailsDispatchcontext.Provider>
    </DetailsContext.Provider>
  );
}

function useDetails() {
  return useContext(DetailsContext);
}
function useDetailsDispatch() {
  return useContext(DetailsDispatchcontext);
}

function useTag() {
  return useContext(TagContext);
}

function detailsReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      return [
        ...state,
        {
          id: item_id++,
          amount: action.amount,
          date: action.date,
          category: action.category,
          isExpense: action.isExpense,
        },
      ];

    case "DELETE_ITEM":
      return state.filter((item) => item.id !== action.id);
    case "UPDATE_ITEM":
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            amount: action.amount,
            date: action.date,
          };
        } else {
          return item;
        }
      });
    case "DELETE_ITEMS_WITH_TAG":
      return state.filter((item) => item.category !== action.category);
    case "UPDATE_ITEMS_WITH_TAG":
      return state.map((item) => {
        if (item.category === action.oldCategory) {
          return {
            id: item.id,
            amount: item.amount,
            date: item.date,
            category: action.newCategory,
            isExpense: item.isExpense,
          };
        } else {
          return item;
        }
      });
    default:
      return state;
  }
}

export { colors, DetailsProvider, useDetails, useDetailsDispatch, useTag };
