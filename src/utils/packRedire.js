// 包装 重定向的 路径

export const packRedire = (object,redireTo) => {
    return {
        ...object,
        redireTo
    }
}