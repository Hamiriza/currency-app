import { act, render, screen } from '@testing-library/react';
import App from './App';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

test('renders top menu', async () => {
  await act(async () => {
    render(<App />);
    await sleep(3000);
  });
  expect(screen.getByText(/Assesment/)).toBeInTheDocument();
});

test('renders base dropdown within 3 seconds', async () => {
  await act(async () => {
    render(<App />);
    await sleep(3000);
  });
  expect(screen.getByTestId("baseDropdown")).toBeInTheDocument();
});

test('shows unity exchange rate for base currency', async () => {
  await act(async () => {
    render(<App />);
    await sleep(3000);
  });
  const euroRateEl = screen.getByTestId('tile-currency-EUR').getElementsByClassName('rate')[0];
  expect(euroRateEl.innerHTML).toEqual('1.00 €');
});
