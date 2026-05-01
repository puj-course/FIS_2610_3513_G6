beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

global.fetch = jest.fn();
